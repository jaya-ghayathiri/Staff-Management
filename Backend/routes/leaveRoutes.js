const router = require("express").Router();
const { applyLeave, getAllLeaves } = require("../controllers/leaveController");

router.post("/", applyLeave);
router.get("/", getAllLeaves);

module.exports = router;
