const User = require('../model/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const message = require('../../config/constant');

exports.signUp = async (req, res, next) => {
  try {
    const {name, email, password, confirm_password} = req.body;
    const emailuser = await User.findOne({email: email});
    if (!emailuser) {
      if (password == confirm_password) {
        const user = new User({
          name: name,
          email: email,
          password: password,
          confirm_password: confirm_password,
        });
        const saveUser = await user.save();
        if(saveUser){
          res.status(200).json({status: false, info: {message: message.createSuccessfull}});
        } else {
          res.status(404).json({status: false, errors: {error: message.invalidInput}});
        }
      } else {
        res.status(400)
            .json({
              status: false,
              message: message.passwordMismatched,
            });
      }
    } else {
      res.status(404).json({status: false, errors: {error: message.userAlreadyExists}});
    }
  } catch (error) {
    next(error);
  }
};

exports.logIn = async (req, res, next) => {
  try {
    const {email, password} = req.body;
    const emailuser = await User.findOne({email: email});
    if (emailuser) {
      if (emailuser.status) {
        const isValid = await bcrypt.compare(password, emailuser.password);
        const token = await emailuser.generateAuthToken(true);
        if (isValid) {
          emailuser.isLogin = true;
          emailuser.save();
          res.status(200)
              .json({status: true,info: {message: message.loginSuccessfully,token: token}});
        } else {
          res.status(400)
              .json({
                status: false,
                errors: {error: message.invalidCredientials},
              });
        }
      } else {
        res.status(400)
            .json({
              status: false,
              errors: {error: message.blockAccounts}
            });
      }
    } else {
      res.json({status: false, errors:{error: message.userNotExists}});
    }
  } catch (error) {
    next(error);
  }
};


exports.logOut = async (req, res, next) => {
  try {
    console.log(req.user._id);
    const user = await User.findByIdAndUpdate({_id: req.user._id}, {isLogin: false});
    if(user){
      res.status(200).json({status: false, info: {message: message.logoutSuccessfull}});
    } else {
      res.json({status: false, errors:{error: message.userNotExists}});
    }
  } catch (error) {
    next(error);
  }
};







