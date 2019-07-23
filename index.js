const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const Sse = require('json-sse')
const testFactory = require('./test/router')

const app = express()
const jsonParser = bodyParser.json()
const stream = new Sse()
const testRouter = testFactory(stream)

app.use(cors())
app.use(jsonParser)
app.use(testRouter)


const port = process.env.PORT || 5000
app.listen(port, () => console.log(`Listening on port: ${port}`))