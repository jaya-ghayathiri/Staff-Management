const router = require("express").Router();
const { markAttendance, getAttendance } = require("../controllers/attendanceController");

router.post("/", markAttendance);
router.get("/:id", getAttendance);

module.exports = router;
