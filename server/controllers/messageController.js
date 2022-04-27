const Chat = require("../models/chatModels");
const Message = require("../models/messageModel");
const User = require("../models/userModel");

const SendMessage = async (req, res) => {
  const { content, chatId } = req.body;
  if (!content || !chatId) {
    console.log("Invalid data.");
    return res.status(400).json({ error: " There is no contenet and chatId" });
  }
  let newMessage = {
    sender: req.user._id,
    content: content,
    chat: chatId,
  };
  try {
    var message = await Message.create(newMessage);
    message = await message.populate("sender", "name pic");
    message = await message.populate("chat");
    message = await User.populate(message, {
      path: "chat.users",
      select: "name email pic",
    });
    await Chat.findByIdAndUpdate(req.body.chatId, {
      latestMessage: message,
    });
    res.json(message);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error: "Something is wrong." });
  }
};

const AllMessages = async (req, res) => {
  console.log(req.params.chatId);
  try {
    const messages = await Message.find({ chat: req.params.chatId })
      .populate("sender", "name pic email")
      .populate("chat");

    res.status(200).json(messages);
  } catch (error) {
    console.log(error);
    res.status(200).json({ error: "Something wrong." });
  }
};
module.exports = { SendMessage, AllMessages };
