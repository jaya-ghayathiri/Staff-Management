const mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema({
  course: String,
  date: Date,
  faculty: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  students: [
    {
      name: String,
      present: Boolean,
    },
  ],
});

module.exports = mongoose.model("Attendance", attendanceSchema);
