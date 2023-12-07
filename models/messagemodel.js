const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
  {
    content: { type: String, required: true },
    senderId: mongoose.Schema.ObjectId,
    chatId: mongoose.Schema.ObjectId,
  },
  { timestamps: true }
);

const Message = mongoose.model("messages", messageSchema);

module.exports = Message;
