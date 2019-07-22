const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const Sse = require('json-sse')

//models
require('./db')
require('./card/model')
require('./retrospective/model')
require('./user/model')

const app = express()
const jsonParser = bodyParser.json()
//const router = new Router()
const stream = new Sse()


app.use(cors())
app.use(jsonParser)



const port = process.env.PORT || 5000
app.listen(port, () => console.log(`Listening on port: ${port}`))