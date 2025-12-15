const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true },
  password: String,
  role: { type: String, enum: ["admin", "faculty", "staff"] },
  department: String
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);
