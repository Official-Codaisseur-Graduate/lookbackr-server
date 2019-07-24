const { Router } = require('express')
const Card = require('./model')
const router = new Router()

router.post('/cards', (req, res, next)  => {
    Card.create(req.body) 
    .then(card => res.status(201).send(card))
    .catch(error => next(error))
})

module.exports = router