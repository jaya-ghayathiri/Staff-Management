const Course = require("../models/Course");
const Timetable = require("../models/Timetable");
const Attendance = require("../models/Attendance");
const Leave = require("../models/Leave");
const Student = require("../models/Student");

// Assigned courses
exports.getAssignedCourses = async (req, res) => {
  try {
    const courses = await Course.find({ faculty: req.user.id });
    res.json(courses);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch courses" });
  }
};

// Students by course
exports.getStudentsByCourse = async (req, res) => {
  try {
    const { courseId } = req.params;
    const students = await Student.find({ course: courseId }).select("name");
    res.json(students);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch students" });
  }
};

// Timetable
exports.getTimetable = async (req, res) => {
  try {
    const timetable = await Timetable.find({ faculty: req.user.id })
      .populate("course", "name code")
      .populate("faculty", "name email");

    res.json(timetable);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch timetable" });
  }
};

// Mark attendance
exports.markAttendance = async (req, res) => {
  try {
    const attendance = await Attendance.create({
      faculty: req.user.id,
      course: req.body.course,
      date: new Date(),
      students: req.body.students,
    });
    res.json({ message: "Attendance marked", attendance });
  } catch (err) {
    res.status(500).json({ message: "Failed to mark attendance" });
  }
};

// Leave status
exports.getLeaveStatus = async (req, res) => {
  try {
    const leaves = await Leave.find({ faculty: req.user.id });
    res.json(leaves);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch leaves" });
  }
};
