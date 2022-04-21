const mongoose = require('mongoose')

const useModel = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  pic: {
    type: String,
    required: true,
    default:
      "https://www.pavilionweb.com/wp-content/uploads/2017/03/man-300x300.png",
  },
}, {timestamps: true});

const User = mongoose.model("User", useModel)
module.exports = User