const User = require("../models/usermodel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  try {
    const { firstname, lastname, email, password } = req.body;
    const user = await User.createUser(firstname, lastname, email, password);
    const refreshtoken = jwt.sign({ id: user._id }, process.env.REFRESH, {
      expiresIn: "1d",
    });

    const accesstoken = jwt.sign({ id: user._id }, process.env.ACCESS, {
      expiresIn: 60 * 15,
    });
    const updateUser = await User.findByIdAndUpdate(user._id, { refreshtoken });
    res.cookie("jwt", refreshtoken, {
      httpOnly: true,
      sameSite: "None",
      secure: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(201).json({ email, accesstoken });
  } catch (error) {
    res.status(500).json("Account already exists");
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.accessUser(email, password);
    const refreshtoken = jwt.sign({ id: user._id }, process.env.REFRESH, {
      expiresIn: "1d",
    });

    const accesstoken = jwt.sign({ id: user._id }, process.env.ACCESS, {
      expiresIn: 60 * 15,
    });
    const updateUser = await User.findByIdAndUpdate(user._id, { refreshtoken });
    res.cookie("jwt", refreshtoken, {
      httpOnly: true,
      sameSite: "None",
      secure: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    res.status(200).json({ email, accesstoken });
  } catch (error) {
    res.status(500).json(error.message);
  }
};

module.exports = { register, login };
