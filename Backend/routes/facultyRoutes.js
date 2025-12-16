const express = require("express");
const router = express.Router();
const facultyCtrl = require("../controllers/facultyController");
const { protect } = require("../middleware/authMiddleware");

router.get("/courses", protect, facultyCtrl.getAssignedCourses);
router.get("/timetable", protect, facultyCtrl.getTimetable);
router.post("/attendance", protect, facultyCtrl.markAttendance);
router.post("/leaves", protect, facultyCtrl.requestLeave);
router.get("/leaves", protect, facultyCtrl.getLeaveStatus);
router.get("/students/:courseId", protect, facultyCtrl.getStudentsByCourse);

module.exports = router;
