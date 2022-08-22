const jwt = require("jsonwebtoken");
const message = require("../../config/constant");

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(" ")[1];

    jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
      if (err) {
        return res
          .status(403)
          .json({ status: false, errors: { error: message.tokenNotValid } });
      }
      req.user = user;
      if (user.isLogin) {
        next();
      } else {
        return res
          .status(401)
          .json({ status: false, errors: { error: message.notAuthenticate } });
      }
    });
  } else {
    return res
      .status(401)
      .json({ status: false, errors: { error: message.notAuthenticate } });
  }
};

module.exports = { verifyToken };
