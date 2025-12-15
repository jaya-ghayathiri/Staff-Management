const Course = require("../models/Course");
const Timetable = require("../models/Timetable");
const Attendance = require("../models/Attendance");
const Leave = require("../models/Leave");

// Assigned courses
exports.getAssignedCourses = async (req, res) => {
  const courses = await Course.find({ faculty: req.user.id });
  res.json(courses);
};

// Timetable
exports.getTimetable = async (req, res) => {
  const timetable = await Timetable.find({ faculty: req.user.id });
  res.json(timetable);
};

// Mark attendance
exports.markAttendance = async (req, res) => {
  const attendance = await Attendance.create({
    faculty: req.user.id,
    course: req.body.course,
    date: new Date(),
    students: req.body.students,
  });
  res.json({ message: "Attendance marked", attendance });
};

// Leave status
exports.getLeaveStatus = async (req, res) => {
  const leaves = await Leave.find({ faculty: req.user.id });
  res.json(leaves);
};
