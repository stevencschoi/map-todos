// load .env data into process.env
require("dotenv").config();

// Web server config
const PORT = process.env.PORT || 4000;
const ENV = process.env.ENV || "development";
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const cors = require("cors");
const morgan = require("morgan");
const server = require("http").Server(app);
const cookieSession = require("cookie-session");
const bcrypt = require("bcrypt");
const MongoClient = require('mongodb').MongoClient;
const mongoose = require('mongoose');

app.use(morgan("dev"));
app.use(cors());
app.use(bodyParser());

// connet to mongodb
mongoose.connect(`mongodb+srv://user:${process.env.MONGODB_PASSWORD}@maps-todo-db-ph5p2.mongodb.net/test?retryWrites=true&w=majority`, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;

//handle mongo error
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  // we're connected!
  console.log("we innnn")
});

app.get("/", function (req, res) {
  res.send("We out here!");
});

app.put("/register", function (req, res) {
  const {username, email, password} = req.body
  const hashedPassword = bcrypt.hashSync(password, 10);
    // console.log("Hashed password:", hashedPassword);
  
});

// Change the 404 message modifing the middleware
app.use(function (req, res, next) {
  res.status(404).send("Page not found!)");
});

server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}!`);
});