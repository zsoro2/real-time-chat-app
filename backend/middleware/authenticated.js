const jwt = require("jsonwebtoken");

const authenticated = (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) return res.sendStatus(401);

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) throw Error(err);
      req.user = user;
      next();
    });
  } catch (error) {
    res.status(401).json({ error: "Invalid Token" + error });
  }
};

module.exports = authenticated;
