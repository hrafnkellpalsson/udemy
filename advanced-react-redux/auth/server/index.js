// Main starting point of application
const express = require('express')
const http = require('http')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const router = require('./router')
const mongoose = require('mongoose')

const app = express()

// DB Setup
const promise = mongoose.connect('mongodb://localhost:auth/auth')

// App Setup (Get express to work the way we want to)
app.use(morgan('combined')) // Logging framework
app.use(bodyParser.json({ type: '*/*' })) // Any incoming request will be parsed as JSON
router(app)

// Server Setup (Get our express application to talk to the outside world)
const port = process.env.PORT || 3090
const server = http.createServer(app)
server.listen(port)
console.log('Server listening on port:', port)
