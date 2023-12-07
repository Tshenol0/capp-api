const express = require("express");
const { logoutFunction } = require("../helpers/logouthelper");

const logout = express.Router();

logout.get("/", logoutFunction);

module.exports = logout;
