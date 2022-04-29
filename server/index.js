const express = require("express");
const app = express();
const cors = require("cors");
const DbConncetion = require("./config/dbConfig");
const userRouter = require("./routes/userRoute");
const chatRoute = require("./routes/chatRoute");
const messageRoute = require("./routes/messageRoute");
const { notFound, errorHandler } = require("./middleWare/errorMiddleWare");
const path = require("path");
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);
app.use(express.json());
require("dotenv").config();
DbConncetion();

app.use("/api/user", userRouter);
app.use("/api/chat", chatRoute);
app.use("/api/message", messageRoute);

app.use(notFound);
app.use(errorHandler);

const server = app.listen(process.env.PORT, () => {
  console.log(`Server is listening at http://localhost:${process.env.PORT}`);
});

// Socket.io connection......
const io = require("socket.io")(server, {
  pingTimeout: 60000,
  cors: {
    origin: "http://localhost:3000",
    // credentials: true,
  },
});
io.on("connection", (socket) => {
  console.log("Connected to socket.io");
  socket.on("setup", (userData) => {
    socket.join(userData._id);
    socket.emit("connected");
  });
  socket.on("join chat", (room) => {
    socket.join(room);
    console.log("User Joined Room: " + room);
  });

  socket.on("new message", (newMessageRecieved) => {
    var chat = newMessageRecieved.chat;

    if (!chat.users) return console.log("chat.users not defined");

    chat.users.forEach((user) => {
      if (user._id == newMessageRecieved.sender._id) return;

      socket.in(user._id).emit("message recieved", newMessageRecieved);
    });
  });

  socket.off("setup", () => {
    console.log("USER DISCONNECTED");
    socket.leave(userData._id);
  });
});
