const Chat = require("../models/chatmodel");
const { findById, findByIdAndUpdate } = require("../models/messagemodel");

const createChat = async (req, res) => {
  try {
    const { friendid, recentmessage } = req.body;
    const chats = new Chat({ recentmessage, chatters: [req.user, friendid] });

    chats.save();
    res.status(201).json("chat successfully created");
  } catch (error) {
    res.status(500).json("chat creation failed");
  }
};

const getChats = async (req, res) => {
  try {
    const { userid } = req.params;

    const chats = await Chat.find({ chatters: { $in: userid } });
    res.status(200).json({ chats });
  } catch (error) {
    res.status(500).json("chat retrieval failed");
  }
};

const removeChat = async (req, res) => {
  try {
    const { id } = req.params;
    const chat = await Chat.find({ chatters: { $all: [id, req.user] } });
    const chatid = chat[0]._id;
    await Chat.findByIdAndDelete(chatid);
    res.status(200).json({ chat: chatid });
  } catch (error) {
    res.status(500).json("chat removal unsuccessful");
  }
};

const updateRecent = async (req, res) => {
  try {
    const { chatid } = req.params;
    const { recentmessage } = req.body;
    await Chat.findByIdAndUpdate(chatid, { recentmessage });
    res.status(200).json("chat successfully updated");
  } catch (error) {
    res.status(500).json("chat creation failed");
  }
};

module.exports = { createChat, getChats, removeChat, updateRecent };
