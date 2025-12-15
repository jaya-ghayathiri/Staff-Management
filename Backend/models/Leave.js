const mongoose = require("mongoose");

const leaveSchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  reason: String,
  status: { type: String, default: "Pending" }
});

module.exports = mongoose.model("Leave", leaveSchema);
