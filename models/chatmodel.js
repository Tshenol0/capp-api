const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema(
  {
    chatters: { type: Array, default: [] },
    recentmessage: { type: String, default: "" },
  },
  { timestamps: true }
);

const Chat = mongoose.model("chats", chatSchema);

module.exports = Chat;
