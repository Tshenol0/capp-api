const Message = require("../models/messagemodel");

const createMessage = async (req, res) => {
  try {
    const { senderId, chatId, content } = req.body;
    const message = await Message.create({ senderId, chatId, content });
    res.status(201).json("message send successful");
  } catch (error) {
    res.status(500).json("message not sent");
  }
};

const getMessages = async (req, res) => {
  try {
    const { chatid } = req.params;
    const messages = await Message.find({ chatId: chatid });
    res.status(200).json({ messages });
  } catch (error) {
    res.status(500).json("No messages");
  }
};

const removeMessages = async (req, res) => {
  try {
    const { id } = req.params;
    const message = await Message.deleteMany({ chatId: id });
    res.status(204).json("removal of message unsuccessful");
  } catch (error) {
    res.status(500).json("removal of message unsuccessful");
  }
};

module.exports = { createMessage, getMessages, removeMessages };
