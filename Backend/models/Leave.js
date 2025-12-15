const mongoose = require("mongoose");

const leaveSchema = new mongoose.Schema({
  faculty: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  reason: String,
  fromDate: Date,
  toDate: Date,
  status: {
    type: String,
    enum: ["Pending", "Approved", "Rejected"],
    default: "Pending",
  },
});

module.exports = mongoose.model("Leave", leaveSchema);
