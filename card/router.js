const { Router } = require('express')
const Card = require('./model')
const router = new Router()

router.post('/cards', (req, res, next)  => {
    Card.create(req.body) 
    .then(card => res.status(201).send(card))
})

module.exports = router