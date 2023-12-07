const User = require("../models/usermodel");

const logoutFunction = async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(204);
  const refreshToken = res.cookie.jwt;

  const user = await User.find({ refreshtoken: refreshToken });

  if (!user) {
    res.clearCookie("jwt", { httpOnly: true, sameSite: none, secure: true });
    return res.sendStatus(403);
  }

  await User.findByIdAndUpdate(user._id, { refreshtoken: "" });
  res.clearCookie("jwt", { httpOnly: true, sameSite: none, secure: true });
  res.sendStatus(204);
};

module.exports = { logoutFunction };
