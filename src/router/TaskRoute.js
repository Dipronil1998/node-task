const express = require('express');
const router = new express.Router();
router.use(express.json({}));
const TaskController=require('../controller/TaskController');
const {validateResult} = require('../middleware/ValidateResult');
const {verifyToken} = require('../middleware/verifytoken');
const isLogin = require("../middleware/IsLogin");

router.post(
    '/:projectId',
    verifyToken,
    isLogin.isLogin,
    TaskController.create,
);

router.get(
    '/:projectId',verifyToken,isLogin.isLogin,
    TaskController.find,
);

router.put(
    '/:projectId/:id',verifyToken,
    isLogin.isLogin,
    TaskController.update,
);

module.exports = router;
