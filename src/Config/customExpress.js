require("dotenv").config();

const express = require("express");
const routes = require("../routes/router");

const customExpress = express();


customExpress.use(express.json());

customExpress.use(routes);


module.exports = customExpress;