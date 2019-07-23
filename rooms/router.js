const { Router } = require("express");

const Room = require("./model");

//A factory function to create a Room router 

module.exports = RoomFactory = stream => {

  const router = Router();

  router.get("/stream", (req, res, next) => {
      
    Room.findAll()
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

  return router;
};

