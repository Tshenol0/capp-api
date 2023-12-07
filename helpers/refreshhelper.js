const User = require("../models/usermodel");
const jwt = require("jsonwebtoken");

const refreshFunction = async (req, res) => {
  const cookies = req.cookies;

  if (!cookies?.jwt) {
    return res.sendStatus(401);
  }

  const refreshToken = cookies.jwt;

  const user = await User.find({ refreshtoken: refreshToken });

  if (!user) {
    res.sendStatus(403);
  }

  jwt.verify(refreshToken, process.env.REFRESH, (err, decoded) => {
    if (err) res.sendStatus(403);
    const accesstoken = jwt.sign({ id: decoded.id }, process.env.ACCESS, {
      expiresIn: "180s",
    });
    res.json({ accesstoken });
  });
};

module.exports = { refreshFunction };
