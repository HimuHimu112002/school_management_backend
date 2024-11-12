const express = require("express");
const router = require("./src/routes/api");
const app = new express();
const cookieParser = require('cookie-parser');

// body perser implementation
const bodyParser = require("body-parser");
app.use(bodyParser.json());

// sequrity middleare
const ratelimit = require("express-rate-limit");
const helmet = require("helmet");
const mongoSanitizer = require("express-mongo-sanitize");
const cors = require("cors");
require("dotenv").config();

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
