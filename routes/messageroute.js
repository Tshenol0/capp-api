const express = require("express");
const {
  createMessage,
  getMessages,
  removeMessages,
} = require("../helpers/messagehelper");
const mid = require("../middleware/verifyFirst");

const message = express.Router();

message.post("/", mid, createMessage);
message.get("/:chatid", mid, getMessages);
message.delete("/:id", mid, removeMessages);

module.exports = message;
