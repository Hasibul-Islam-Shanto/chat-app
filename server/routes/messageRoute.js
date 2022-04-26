const express = require('express')
const router = express.Router()
const {protect} = require('../middleWare/authMiddleWare')
const { SendMessage, AllMessages } = require('../controllers/messageController')

router.post('/sendsms', protect, SendMessage)
router.get('/:chatId', protect, AllMessages)
module.exports = router