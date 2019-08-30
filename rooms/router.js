const {Router} = require("express");
const User = require('../user/model');
const Card = require('../card/model');
const Room = require("./model");


module.exports = RoomFactory = stream => {
    const router = Router();

    router.get("/stream", (req, res, next) => {
        Room
            .findAll({include: [User, Card]})
            .then(rooms => {
                const json = JSON.stringify(rooms)
                stream.updateInit(json)
                stream.init(req, res)
            })
            .catch(err => next(err))
    })

    router.post('/cards', (req, res, next) => {
        Card
            .create(req.body)
            .then(card => {
                Room
                    .findAll({include: [User, Card]})
                    .then(rooms => JSON.stringify(rooms))
                    .then(rooms => {
                        stream.updateInit(rooms)
                        stream.send(rooms)
                    })
                    .then(() => {
                        res.status(201).send(card)
                    })
            })
            .catch(error => next(error))
    })

    router.post("/rooms", (req, res, next) => {
        Room
            .create(req.body)
            .then(room => {
                Room
                    .findAll({include: [User, Card]})
                    .then(rooms => JSON.stringify(rooms))
                    .then(rooms => {
                        stream.updateInit(rooms)
                        stream.send(rooms)
                    })
                    .then(() => res.send(room))
                    .catch(err => next(err))
            });
    });

    router.put("/enter-room/:id", (req, res, next) => {
        const id = parseInt(req.params.id)
        const user = req.body.user.id
        User
            .findByPk(user)
            .then(user => {
                user
                    .update({retroId: id})
                    .then(user => {
                        const updatedUser = user
                        Room
                            .findAll({include: [User, Card]})
                            .then(rooms => JSON.stringify(rooms))
                            .then(rooms => {
                                stream.updateInit(rooms)
                                stream.send(rooms)
                            })
                            .then(() => res.send(updatedUser))
                    })
            })
            .catch(err => next(err))
    })

    router.put("/room/:id", (req, res, next) => {
        const id = parseInt(req.params.id)
        const user = req.body.user.id
        User
            .findByPk(user)
            .then(user => {
                user
                    .update({done: true})
                    .then(user => {
                        Room
                            .findByPk(id, {include: [User]})
                            .then(room => {
                                const checkDone = room.users.every(user => {
                                    return user.done === true
                                })
                                room
                                    .update({done: checkDone})
                                    .then(() => {
                                        Room
                                            .findAll({include: [User, Card]})
                                            .then(rooms => JSON.stringify(rooms))
                                            .then(rooms => {
                                                stream.updateInit(rooms)
                                                stream.send(rooms)
                                            })
                                    })
                            })
                            .then(() => {
                                res.status(201).json(user)
                            })
                    })
            })
            .catch(err => next(err))
    })

    router.put("/reset/:id", (req, res, next) => {
        const id = parseInt(req.params.id)
        const user = req.body.user.id
        User
            .findByPk(user)
            .then(user => {
                user
                    .update({done: false})
                    .then(user => {
                        Room
                            .findByPk(id, {include: [User]})
                            .then(room => {

                                room
                                    .update({done: false})
                                    .then(() => {
                                        Room
                                            .findAll({include: [User, Card]})
                                            .then(rooms => JSON.stringify(rooms))
                                            .then(rooms => {
                                                stream.updateInit(rooms)
                                                stream.send(rooms)
                                            })
                                    })
                            })
                            .then(() => {
                                res.status(201).json(user)
                            })
                    })
            })
            .catch(err => next(err))
    })
    router.delete('/room/:id', (req, res, next) => {
        const id = parseInt(req.params.id)
        Room.destroy({
            where: {
                id: req.params.id,
            }
        })
            .then(numDeleted => {
                if (numDeleted) {
                    return res.status(204).end()
                }
                return res.status(404).end()
            })
            .catch(next)
    })
    return router;
}

