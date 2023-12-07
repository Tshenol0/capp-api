const jwt = require("jsonwebtoken");

const mid = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.sendStatus(401);
  }

  jwt.verify(token, process.env.ACCESS, (err, data) => {
    if (err) {
      return res.sendStatus(403);
    }
    req.user = data.id;
    next();
  });
};

module.exports = mid;
