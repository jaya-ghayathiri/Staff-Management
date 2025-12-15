const express = require("express");
const router = express.Router();
const facultyCtrl = require("../controllers/facultyController");
const auth = require("../middleware/authMiddleware");

router.get("/courses", auth, facultyCtrl.getAssignedCourses);
router.get("/timetable", auth, facultyCtrl.getTimetable);
router.post("/attendance", auth, facultyCtrl.markAttendance);
router.get("/leaves", auth, facultyCtrl.getLeaveStatus);

module.exports = router;
