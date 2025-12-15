const mongoose = require("mongoose");

const timetableSchema = new mongoose.Schema({
  faculty: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  day: String,
  course: String,
  time: String,
});

module.exports = mongoose.model("Timetable", timetableSchema);
