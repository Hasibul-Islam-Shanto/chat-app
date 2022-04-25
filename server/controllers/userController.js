const User = require("../models/userModel");
const generateToken = require('../config/tokenGenarate')

const SignUp = async (req, res) => {
  const { name, email, password, pic } = req.body;
  try {
    if (!name || !email || !password) {
      return res.status(400).json({ error: "Please fill all the fields." });
    }
    const existUser = await User.findOne({ email });
    if (existUser) {
      return res.status(400).json({ error: "User already exist." });
    }
    const user = await User.create({ name, email, password, pic });
    if (user) {
      res.status(200).json({
        id: user._id,
        name: user.name,
        email: user.email,
        pic: user.pic,
        token: generateToken(user._id),
      });
    } else {
      res.status(400).json({ error: error });
      console.log(error)
    }
  } catch (error) {
    res.status(400).json({ error: error });
    console.log(error)
  }
};

const Login = async(req, res)=>{
    console.log(req.body)
     const { email, password } = req.body;

     const user = await User.findOne({ email });

    try {
         if (user && (await user.matchPassword(password))) {
           res.status(200).json({
             _id: user._id,
             name: user.name,
             email: user.email,
             pic: user.pic,
             token: generateToken(user._id),
           });
         } else {
           res.status(401).json({ error: "Password not matched." });
         }
    } catch (error) {
        res.status(400).json({erro : "Login failed."})
    }
}
const GetAllUsers = async(req, res) =>{
 try {
    const users = await User.find();
    res.status(200).json(users)
 } catch (error) {
   console.log(error);
   res.status(400).json({error :"There is no users.."})
 }

}

module.exports = { SignUp, Login, GetAllUsers };
