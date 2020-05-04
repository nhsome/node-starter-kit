'use strict'

const express = require('express'),
  bodyParser = require('body-parser'),
  cors = require('./middlewares/cors'),
  resolveIp = require('./middlewares/resolveIp'),
  expressFileUpload = require('express-fileupload')

const server = express()

server.use(bodyParser.urlencoded({ extended: true }))
server.use(bodyParser.json({ limit: '50mb', extended: true }))

//CORS
if (process.env.NODE_ENV !== 'production') {
  server.use(cors)
}

server.use(resolveIp)

server.use(expressFileUpload({}))

module.exports = server
