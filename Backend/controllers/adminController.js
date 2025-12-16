const Course = require("../models/Course");
const Timetable = require("../models/Timetable");
const Student = require("../models/Student");
const Leave = require("../models/Leave");
const User = require("../models/User");

// ------------------- Courses -------------------
// Create a course and assign a faculty
exports.createCourse = async (req, res) => {
  try {
    const { name, code, faculty } = req.body;
    const course = await Course.create({ name, code, faculty });
    res.status(201).json({ message: "Course created", course });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Get all courses (optionally filter by faculty)
exports.getAllCourses = async (req, res) => {
  const courses = await Course.find().populate("faculty", "name email role");
  res.json(courses);
};

// Update a course
exports.updateCourse = async (req, res) => {
  const { id } = req.params;
  const { name, code, faculty } = req.body;
  const updated = await Course.findByIdAndUpdate(id, { name, code, faculty }, { new: true });
  res.json({ message: "Course updated", course: updated });
};

// Delete a course
exports.deleteCourse = async (req, res) => {
  const { id } = req.params;
  await Course.findByIdAndDelete(id);
  res.json({ message: "Course deleted" });
};

// ------------------- Timetable -------------------
// Create a timetable entry
exports.createTimetable = async (req, res) => {
  const { faculty, course, day, time } = req.body;
  const timetable = await Timetable.create({ faculty, course, day, time });
  res.status(201).json({ message: "Timetable created", timetable });
};

// Get all timetable entries
exports.getTimetable = async (req, res) => {
  const timetable = await Timetable.find().populate("faculty course");
  res.json(timetable);
};

// Update timetable entry
exports.updateTimetable = async (req, res) => {
  const { id } = req.params;
  const { faculty, course, day, time } = req.body;
  const updated = await Timetable.findByIdAndUpdate(
    id,
    { faculty, course, day, time },
    { new: true }
  );
  res.json({ message: "Timetable updated", timetable: updated });
};

// Delete timetable entry
exports.deleteTimetable = async (req, res) => {
  const { id } = req.params;
  await Timetable.findByIdAndDelete(id);
  res.json({ message: "Timetable deleted" });
};

// ------------------- Students -------------------
// Create student and assign to course
exports.createStudent = async (req, res) => {
  const { name, email, course } = req.body;
  const student = await Student.create({ name, email, course });
  res.status(201).json({ message: "Student created", student });
};

// Get all students
exports.getAllStudents = async (req, res) => {
  const students = await Student.find().populate("course");
  res.json(students);
};


// Update student
exports.updateStudent = async (req, res) => {
  const { id } = req.params;
  const { name, email, course } = req.body;
  const updated = await Student.findByIdAndUpdate(id, { name, email, course }, { new: true });
  res.json({ message: "Student updated", student: updated });
};

// Delete student
exports.deleteStudent = async (req, res) => {
  const { id } = req.params;
  await Student.findByIdAndDelete(id);
  res.json({ message: "Student deleted" });
};

// ------------------- Leave -------------------
// Get all leave requests
exports.getAllLeaves = async (req, res) => {
  const leaves = await Leave.find().populate("faculty", "name email role");
  res.json(leaves);
};

// Approve / Reject leave
exports.updateLeaveStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body; // "Approved" or "Rejected"
  const updated = await Leave.findByIdAndUpdate(id, { status }, { new: true });
  res.json({ message: "Leave status updated", leave: updated });
};
