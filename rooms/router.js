const { Router } = require("express");
const User = require('../user/model')
const Card = require('../card/model')
const Room = require("./model");

//A factory function to create a Room router 

module.exports = RoomFactory = stream => {

  const router = Router();

  router.get("/stream", (req, res, next) => {

    Room.findAll({ include: [User, Card] })
      .then(rooms => {
        const json = JSON.stringify(rooms);
        stream.updateInit(json);
        stream.init(req, res);
      })
      .catch(err => next(err))
  });

  router.post("/rooms", (req, res, next) => {
    Room.create(req.body)
      .then(room => {
        Room.findAll()
          .then(rooms => JSON.stringify(rooms))
          .then(rooms => {
            stream.updateInit(rooms)
            stream.send(rooms)
          })
          .then(() => res.send(room))
          .catch(err => next(err))
      });
  });

  router.put("/rooms/:id", (req, res, next) => {
    const id = parseInt(req.params.id)
    const user = req.body.user.id
    console.log('REQUEST BODY?????????????', req.body)
    User.findByPk(user)
      .then(user => {
        user
          .update({ retroId: id })
          .then(user => {
            const updatedUser = user
            Room
              .findAll()
              .then(rooms => JSON.stringify(rooms))
              .then(rooms => {
                stream.updateInit(rooms)
                stream.send(rooms)
              })
              .then(() => res.send(updatedUser))
          })
        /*
        .then(user => JSON.stringify(user))
        .then(user => {
          stream.updateInit(user)
          stream.send(user)
        })
        .then(() => res.send(user))
        */
      })

      .catch(err => next(err))
  })

  return router;
};

