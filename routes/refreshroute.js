const express = require("express");
const { refreshFunction } = require("../helpers/refreshhelper");

const refresh = express.Router();

refresh.get("/", refreshFunction);

module.exports = refresh;
