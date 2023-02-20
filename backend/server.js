const express = require('express')
const app = express()
const port = 3000

const api = require("./api/api")

const bodyParser = require("express").json;
app.use(bodyParser());

app.use('/', api)

app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})