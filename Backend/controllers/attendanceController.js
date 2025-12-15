const Attendance = require("../models/Attendance");

exports.markAttendance = async (req, res) => {
  const attendance = await Attendance.create(req.body);
  res.json(attendance);
};

exports.getAttendance = async (req, res) => {
  const records = await Attendance.find({ userId: req.params.id });
  res.json(records);
};
