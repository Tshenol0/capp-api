const express = require("express");
const {
  createChat,
  getChats,
  removeChat,
  updateRecent,
} = require("../helpers/chathelper");
const mid = require("../middleware/verifyFirst");

const chat = express.Router();
chat.post("/", mid, createChat);
chat.get("/:id", mid, getChats);
chat.delete("/:id", mid, removeChat);
chat.put("/:chatid", mid, updateRecent);

module.exports = chat;
