const Project = require("../model/Project");
const User = require("../model/User");
const message = require("../../config/constant");

exports.create = async (req, res, next) => {
  try {
    const name = req.body.name;
    const description = req.body.description;
    const hostLink = req.body.host_link;
    const technolgy = req.body.technolgy;
    const category = req.body.category;
    const userId = req.user._id;
    const getUser = await User.findOne({ _id: userId });
    if (getUser !== null) {
      const project = new Project({
        name: name,
        description: description,
        host_link: hostLink,
        technolgy: technolgy,
        category: category,
        user: userId,
      });
      const createProject = await project.save();
      if (createProject) {
        res.status(201).json({
          status: true,
          info: { message: message.projectCreateSuccessful },
        });
      } else {
        res
          .status(404)
          .json({ status: false, errors: { error: message.invalidInput } });
      }
    } else {
      res
        .status(400)
        .json({ status: false, errors: { error: message.userNotExists } });
    }
  } catch (error) {
    next(error);
  }
};

exports.find = async (req, res, next) => {
  try {
    const project = await Project.find({user: req.user._id});
    if (project.length === 0) {
      res.status(400).json({ status: false, errors: { error: message.dataNotFound } });;
    } else {
      res.status(200).json({
        status: true,
        info: project,
      });
    }
  } catch (error) {
    next(error);
  }
};

exports.update = async (req, res, next) => {
  try {
    const _id = req.params.id;
    const userId = req.user._id;
    console.log(userId);
    if (userId) {
      const getUser = await User.findOne({ _id: userId });
      console.log(getUser);
      if (getUser === null) {
        return res
          .status(404)
          .json({ status: false, errors: { error: message.userNotExists } });
      }
    }
    const name = req.body.name;
    const description = req.body.description;
    const hostLink = req.body.host_link;
    const technolgy = req.body.technolgy;
    const category = req.body.category;
    const updateData = {
      name: name,
      description: description,
      host_link: hostLink,
      technolgy: technolgy,
      category: category,
      user: userId,
    };
    const project = await Project.findByIdAndUpdate({ _id: _id }, updateData);
    if (!project) {
      res
        .status(404)
        .json({ status: false, errors: { error: message.dataNotFound } });
    } else {
      res
        .status(200)
        .json({ status: true, info: { message: message.dataUpdateSuccess } });
    }
  } catch (error) {
    next(error);
  }
};
