const { Router } = require('express')
const User = require('./model')
const router = new Router()


router.post("/users", (req, res) => {
    const user = {username: req.body.username}
    User
      .create(user).then(user => {
      res.status(201).send(user)
    })
  })

module.exports = router