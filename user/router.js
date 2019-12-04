const { Router } = require("express");
const bcrypt = require("bcryptjs");
const User = require("./model");
const router = new Router();

router.post("/users", (req, res) => {
  const user = {
    username: req.body.username,
    password: bcrypt.hashSync(req.body.password, 10)
  };

  User.create(user).then(user => {
    res.status(201).send(user);
  });
});

module.exports = router;
