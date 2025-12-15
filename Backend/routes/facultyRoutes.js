const express = require("express");
const router = express.Router();
const facultyCtrl = require("../controllers/facultyController");
const { protect } = require("../middleware/authMiddleware");

router.get("/courses", protect, facultyCtrl.getAssignedCourses);
router.get("/timetable", protect, facultyCtrl.getTimetable);
router.post("/attendance", protect, facultyCtrl.markAttendance);
router.get("/leaves", protect, facultyCtrl.getLeaveStatus);


module.exports = router;
