const express = require("express");
const { register, login } = require("../helpers/authuser");
const {
  searchUser,
  follow,
  unfollow,
  getUser,
  updateStatus,
  updateFirstName,
  updateLastName,
  imageUpdate,
  forgotPassword,
  resetPassword,
} = require("../helpers/userhelper");
const mid = require("../middleware/verifyFirst");
const upload = require("../middleware/upload");

const user = express.Router();

user.post("/register", register);
user.post("/login", login);
user.get("/", mid, searchUser);
user.get("/:id", mid, getUser);
user.put("/:id/follow", mid, follow);
user.put("/:id/unfollow", mid, unfollow);
user.put("/updatestatus", mid, updateStatus);
user.put("/updatefirstname", mid, updateFirstName);
user.put("/updatelastname", mid, updateLastName);
user.post("/upload/:id", upload.single("file"), imageUpdate);

module.exports = user;
