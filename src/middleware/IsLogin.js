const User = require("../model/User");
const message = require("../../config/constant");

exports.isLogin = async (req, res, next) => {
  const IsLoginUser = await User.findById({ _id: req.user._id });
  if (IsLoginUser.isLogin) {
    next();
  } else {
    return res
      .status(401)
      .json({ status: false, errors: { error: message.notAuthenticate } });
  }
};
