const express = require('express');
const router = new express.Router();
router.use(express.json({}));
const ProjectController=require('../controller/ProjectController');
const {validateResult} = require('../middleware/ValidateResult');
const {verifyToken} = require('../middleware/verifytoken');
const isLogin = require("../middleware/IsLogin");

router.post(
    '',
    verifyToken,
    isLogin.isLogin,
    ProjectController.create,
);

router.get(
    '',verifyToken,
    isLogin.isLogin,
    ProjectController.find,
);

router.put(
    '/:id',verifyToken,
    isLogin.isLogin,
    ProjectController.update,
);

module.exports = router;
