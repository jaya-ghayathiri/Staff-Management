const Course = require("../models/Course");
const Timetable = require("../models/Timetable");
const Attendance = require("../models/Attendance");
const Leave = require("../models/Leave");

// Assigned courses
exports.getAssignedCourses = async (req, res) => {
  const courses = await Course.find({ faculty: req.user.id })
  .populate("faculty", "name email");

};

// Timetable
exports.getTimetable = async (req, res) => {
  try {
    const timetable = await Timetable.find({ faculty: req.user.id })
      .populate("course", "name code")   // 👈 IMPORTANT
      .populate("faculty", "name email");

    res.json(timetable);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch timetable" });
  }
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
