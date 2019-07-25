const { Router } = require('express')
const User = require('./model')
const router = new Router()


//endpoint to create a user
router.post("/users", (req, res, next) => {
    const user = {username: req.body.username}
    User.create(user).then(user => {
      res.status(201).send(user);
    });
  });

module.exports = router