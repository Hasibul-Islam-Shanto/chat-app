const express = require('express')
const router = express.Router()
const { SignUp, Login, GetAllUsers } = require("../controllers/userController");
const { route } = require('./chatRoute')
router.get('/', (req, res) =>{
    res.send("Hello World..")
})

//Signup for user......
router.post('/signup', SignUp)
router.post("/login", Login)
router.get('/allusers', GetAllUsers)


module.exports = router