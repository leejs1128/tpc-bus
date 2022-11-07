const express = require('express')
express
const http = require('http')
const app = express()
let path = require('path')
let server = http.createServer(app)

app.get('/', function (req, res) {
  res.send('rootpage')
})

server.listen('포트넘버', '', function () {
  console.log('server listen on port' + server.address().port)
})
