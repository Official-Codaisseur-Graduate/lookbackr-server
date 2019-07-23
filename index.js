const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const Sse = require('json-sse')
const testFactory = require('./test/router')
const roomFactory = require('./rooms/router')
const user = require('./user/router')

const app = express()
const jsonParser = bodyParser.json()
const stream = new Sse()
const testRouter = testFactory(stream)
const roomRouter = roomFactory(stream)

app.use(cors())
app.use(jsonParser)
app.use(testRouter)
app.use(roomRouter)
app.use(user)

const port = process.env.PORT || 5000
app.listen(port, () => console.log(`Listening on port: ${port}`))
