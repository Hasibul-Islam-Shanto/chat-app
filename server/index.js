const express = require('express')
const app = express()
const cors = require("cors")
const DbConncetion = require('./dbConfig')
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

require("dotenv").config()
DbConncetion()

app.get('/', (req, res) => {
    res.json("Hello World.")
})

app.listen(process.env.PORT, ()=>{
    console.log(`Server is listening at http://localhost:${process.env.PORT}`);
})