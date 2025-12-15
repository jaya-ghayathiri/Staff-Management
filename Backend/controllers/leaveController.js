const Leave = require("../models/Leave");

exports.applyLeave = async (req, res) => {
  const leave = await Leave.create(req.body);
  res.json(leave);
};

exports.getAllLeaves = async (req, res) => {
  const leaves = await Leave.find();
  res.json(leaves);
};
