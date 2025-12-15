const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");
const { protect } = require("../middleware/authMiddleware");

// All admin routes should be protected
router.use(protect);

// --- Courses ---
router.post("/courses", adminController.createCourse);
router.get("/courses", adminController.getAllCourses);
router.put("/courses/:id", adminController.updateCourse);
router.delete("/courses/:id", adminController.deleteCourse);

// --- Timetable ---
router.post("/timetable", adminController.createTimetable);
router.get("/timetable", adminController.getTimetable);
router.put("/timetable/:id", adminController.updateTimetable);
router.delete("/timetable/:id", adminController.deleteTimetable);

// --- Students ---
router.post("/students", adminController.createStudent);
router.get("/students", adminController.getAllStudents);
router.put("/students/:id", adminController.updateStudent);
router.delete("/students/:id", adminController.deleteStudent);

// --- Leave requests ---
router.get("/leaves", adminController.getAllLeaves);
router.put("/leaves/:id", adminController.updateLeaveStatus);

module.exports = router;
