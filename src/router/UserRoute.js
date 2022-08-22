const express = require('express');
const router = new express.Router();
router.use(express.json({}));
const uesrController=require('../controller/UserController');
const userValidator=require('../validator/UserValidation');
const {validateResult} = require('../middleware/ValidateResult');
const {verifyToken} = require('../middleware/verifytoken');
const isLogin = require("../middleware/IsLogin");

router.post(
    '/signup',
    userValidator.signInValidator,
    validateResult,
    uesrController.signUp,
);

router.post('/login', userValidator.logInValidator, validateResult, uesrController.logIn);

router.get('/logout', verifyToken,isLogin.isLogin, uesrController.logOut);

module.exports = router;
