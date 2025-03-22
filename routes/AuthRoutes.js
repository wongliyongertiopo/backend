const express = require("express");
const routes = express.Router();
const { signIn } = require("../controllers/AuthController");

routes.post("sigin", signIn);

module.exports = routes;
