const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const app = express();
const port = process.env.PORT || 8082;
const users = require("./route/api/users");
// const pets = require('./route/api/pets');
// const temp = require('./route/api/temp');

const mongoose = require("mongoose");
const cors = require("cors");
app.use(cors({ origin: true, credentials: true }));
app.use(express.json({ etended: false }));
app.use('/api/users', users);
// app.use('/api/pets', pets);
// app.use('/api/temp', temp);
const conn_str = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cooldawgs-cluster1.qrigh6d.mongodb.net/?retryWrites=true&w=majority&appName=CoolDawgs-Cluster1`;

mongoose.set("strictQuery", false);
mongoose
  .connect(conn_str)
  .then(() => {
    app.listen(port, () => console.log(`Server running on port ${port}`));
    console.log(`MongoDB Connection Suceeded...`);
  })
  .catch((err) => {
    console.log(`Error in DB Connection ${err}`);
  });
