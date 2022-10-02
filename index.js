const express = require('express')
const database = require('./database')
const cors = require('cors');
const passport = require("passport");

// Connect to database
database.connect()

// Create app express & handle cors
const app = express()
app.use(cors());

// for parsing application/json
app.use(express.json());

//Initialize passport middleware
app.use(passport.initialize());
require("./middlewares/jwt")(passport);

//Configure Route
require('./routes/index')(app);

// Middleware to launch client app
app.use(express.json());
app.use(express.static(__dirname + "/repeatagain-app/dist/repeatagain-app/"));

module.exports = app;