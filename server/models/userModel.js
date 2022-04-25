const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const useModel = mongoose.Schema(
  {
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
      default:
        "https://www.pavilionweb.com/wp-content/uploads/2017/03/man-300x300.png",
    },
  },
  { timestamps: true }
);
//password validation...
useModel.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// hash password saving...
useModel.pre("save", async function (next) {
  if (!this.isModified) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});
const User = mongoose.model("User", useModel);
module.exports = User;
