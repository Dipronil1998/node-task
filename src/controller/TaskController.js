const Task = require("../model/Task");
const Project = require("../model/Project");
const message = require("../../config/constant");

exports.create = async (req, res, next) => {
  try {
    console.log("A",req.params.projectId);
    const name = req.body.name;
    const description = req.body.description;
    const comments = req.body.comments;
    const assignedTo = req.body.assigned_to;
    const deadLine = req.body.dead_line;
    const projectId = req.params.projectId;
    const getProject = await Project.findOne({ _id: projectId });
    console.log(getProject);
    if (getProject !== null) {
      const task = new Task({
        name: name,
        description: description,
        comments: comments,
        assigned_to: assignedTo,
        dead_line: deadLine,
        project: projectId,
      });
      const createtask = await task.save();
      if (createtask) {
        res.status(201).json({
          status: true,
          info: { message: message.taskCreateSuccessful },
        });
      } else {
        res
          .status(404)
          .json({ status: false, errors: { error: message.invalidInput } });
      }
    } else {
      res
        .status(400)
        .json({ status: false, errors: { error: message.dataNotFound } });
    }
  } catch (error) {
    next(error);
  }
};

exports.find = async (req, res, next) => {
  try {
    const projectId = req.params.projectId
    const task = await Task.find({project: projectId});
    if (task.length === 0) {
      res.status(400).json({ status: false, errors: { error: message.dataNotFound } });;
    } else {
      res.status(200).json({
        status: true,
        info: task,
      });
    }
  } catch (error) {
    next(error);
  }
};

exports.update = async (req, res, next) => {
  try {
    const _id = req.params.id;
    const projectId = req.params.projectId;
    if (projectId) {
      const getProgect = await Project.findOne({ _id: _id, project: projectId});
      if (getProgect === null) {
        return res
          .status(404)
          .json({ status: false, errors: { error: message.userNotExists } });
      }
    }
    const name = req.body.name;
    const description = req.body.description;
    const comments = req.body.comments;
    const assignedTo = req.body.assigned_to;
    const deadLine = req.body.dead_line;
    const updateData = {
        name: name,
        description: description,
        comments: comments,
        assigned_to: assignedTo,
        dead_line: deadLine,
        project: projectId,
    };
    const task = await Task.findByIdAndUpdate({ _id: _id, project: projectId }, updateData);
    if (!task) {
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
