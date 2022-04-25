const express = require('express')
const router = express.Router();
const {protect} = require("../middleWare/authMiddleWare")
const {
  AccessChat,
  getChats,
  newgroupchat,
  renamegroup,
  addNewUser,
  removeUser,
} = require("../controllers/chatController");

router.post("/newchat",protect, AccessChat)
router.get("/getchats",protect, getChats)
router.post("/newgroupchat", protect, newgroupchat)
router.put('/renamegroup', protect, renamegroup)
router.put('/adduser', protect, addNewUser)
router.put('/removeuser', protect, removeUser)

module.exports = router