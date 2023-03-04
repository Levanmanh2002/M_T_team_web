require("./config/db")
const express = require("express")
const app = express()
const port = process.env.PORT || 3000

const Music = require("./api/music/download_music")
const DeleteMusic = require("./api/delete_music/delete_music")
const Search = require("./api/search_music/search_music")
const Edit = require("./api/edit_music/edit_music")
const Register = require("./auth/register")
const Login = require("./auth/login")
const DeleteAuth = require("./auth/delete_auth")

const bodyParser = require("express").json;
app.use(bodyParser());

app.use('/', Music)
app.use('/delete', DeleteMusic)
app.use('/', Search)
app.use('/', Edit)
app.use('/auth', Register)
app.use('/auth', Login)
app.use('/delete_auth', DeleteAuth)


app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})