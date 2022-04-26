const express = require("express");
const app = express();
const cors = require("cors");
const DbConncetion = require("./config/dbConfig");
const userRouter = require("./routes/userRoute");
const chatRoute = require("./routes/chatRoute");
const messageRoute = require('./routes/messageRoute')
const { notFound, errorHandler } = require("./middleWare/errorMiddleWare");
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
app.listen(process.env.PORT, () => {
  console.log(`Server is listening at http://localhost:${process.env.PORT}`);
});
