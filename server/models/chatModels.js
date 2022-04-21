const mongoose = require('mongoose')
const chatModel = mongoose.Schema(
  {
    chatName: { type: String, trim: true },
    isGrouptChat: { type: Boolean, default: false },
    users: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    latesMessage: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Message",
    },
    groupAdmin: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestaamps: ture }
);
const Chat = mongoose.model('Chat', chatModel)
module.exports = Chat