const express = require("express");
const router = require("./src/routes/api");
const app = new express();
//const path = require('path');

// user for google auth
const session = require('express-session');
const passport = require('passport');
require('dotenv').config();
require('./src/passport/passport');
const cookieParser = require('cookie-parser');

// Middleware for google
app.use(
  session({
    secret: process.env.SESSION_SECRET || 'default-secret-key',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false },
  })
);
app.use(passport.initialize());
app.use(passport.session());

// body perser implementation
const bodyParser = require("body-parser");
app.use(bodyParser.json());

// sequrity middleare
const ratelimit = require("express-rate-limit");
const helmet = require("helmet");
const mongoSanitizer = require("express-mongo-sanitize");
const cors = require("cors");

// sequrity middleare implementation
app.use(cors());
app.use(helmet());
app.use(mongoSanitizer());
app.use(cookieParser());

// rate limiter implementation
ratelimit({ windowMs: 15 * 60 * 100, max: 3000 });

// api in-point
app.use("/api/v1", router);

router.use("*", (req, res) => {
  res.status(404).send("404 - Not Found");
});

module.exports = app;
