const express = require("express");
const router = express.Router();
const { SignUp, Login, GetAllUsers } = require("../controllers/userController");
const { route } = require("./chatRoute");
const { protect } = require("../middleWare/authMiddleWare");

//Signup for user......
router.post("/signup", SignUp);
router.post("/login", Login);
router.get("/allusers", protect, GetAllUsers);

module.exports = router;
