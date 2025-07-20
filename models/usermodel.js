const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const crypto = require("crypto");

const userSchema = new mongoose.Schema(
  {
    firstname: { type: String, required: true, trim: true },
    lastname: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true },
    password: {
      type: String,
      required: true,
      trim: true,
      minlength: 60,
    },
    followers: { type: Array, default: [] },
    following: { type: Array, default: [] },
    picture: { type: String, default: "/assets/no-user.jpg" },
    status: { type: String, default: "" },
    refreshtoken: { type: String, default: "" },
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,
  },
  { timestamps: true }
);

userSchema.statics.createUser = async function (
  firstname,
  lastname,
  email,
  password
) {
  if (firstname === "" || lastname === "" || email === "" || password === "") {
    throw new Error("All input is required");
  }
  if (!validator.isEmail(email)) {
    throw new Error("Email is not valid");
  }
  if (!validator.isStrongPassword(password)) {
    throw new Error("Password is weak");
  }

  const salt = await bcrypt.genSalt();
  const newPass = await bcrypt.hash(password, salt);

  const createdUser = await this.create({
    firstname,
    lastname,
    email,
    password: newPass,
  });

  return createdUser;
};

userSchema.statics.accessUser = async function (email, password) {
  if (email === "" || password === "") {
    throw new Error("All input required");
  }
  const user = await this.findOne({ email });

  if (!user) {
    throw new Error("Create account first");
  }

  const check = await bcrypt.compare(password, user.password);

  if (!check) {
    throw new Error("Password incorrect");
  }

  return user;
};

const User = mongoose.model("users", userSchema);

module.exports = User;
