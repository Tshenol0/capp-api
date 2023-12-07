const jwt = require("jsonwebtoken");
const User = require("../models/usermodel");
const multer = require("multer");

const searchUser = async (req, res) => {
  const searchword = req.query.search
    ? {
        $or: [
          { firstname: { $regex: req.query.search, $options: "i" } },
          { lastname: { $regex: req.query.search, $options: "i" } },
        ],
      }
    : {};

  const users = await User.find(searchword)
    .find({ _id: { $ne: req.user } })
    .select("-password");
  res.status(200).json({ users });
};

const follow = async (req, res) => {
  try {
    const userid = req.user;
    const { id } = req.params;

    const user = await User.findByIdAndUpdate(id, {
      $push: { followers: userid },
    });
    const friend = await User.findByIdAndUpdate(userid, {
      $push: { following: id },
    });

    res.status(200).json("successfully followed");
  } catch (error) {
    res.status(500).json("failed");
  }
};

const unfollow = async (req, res) => {
  try {
    const userid = req.user;
    const { id } = req.params;

    const user = await User.findByIdAndUpdate(id, {
      $pull: { followers: userid },
    });
    const friend = await User.findByIdAndUpdate(userid, {
      $pull: { following: id },
    });

    res.status(200).json("successfully unfollowed");
  } catch (error) {
    res.status(500).json("failed");
  }
};

const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id).select("-password");
    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json("There is no such user");
  }
};

const updateStatus = async (req, res) => {
  const { status } = req.body;
  try {
    const user = await User.findByIdAndUpdate(req.user, { status });
    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json("status update fail");
  }
};

const updateFirstName = async (req, res) => {
  const { firstname } = req.body;
  try {
    const user = await User.findByIdAndUpdate(req.user, {
      firstname: firstname,
    });
    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json("firstname update fail");
  }
};

const updateLastName = async (req, res) => {
  const { lastname } = req.body;
  try {
    const user = await User.findByIdAndUpdate(req.user, { lastname: lastname });
    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json("lastname update fail");
  }
};

const imageUpdate = async (req, res) => {
  try {
    const { id } = req.params;
    const img = await User.findByIdAndUpdate(id, {
      picture: `/assets/${req.file.filename}`,
    });
    res.status(200).json({ file: `assets/${req.file.filename}` });
  } catch (error) {
    res.status(500).json("image upload fail");
  }
};

module.exports = {
  searchUser,
  follow,
  unfollow,
  getUser,
  updateStatus,
  updateFirstName,
  updateLastName,
  imageUpdate,
};
