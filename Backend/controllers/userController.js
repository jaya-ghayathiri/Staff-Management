const User = require("../models/User");

// GET /users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find({role: { $ne: "admin" }}).select("-password"); // Exclude password
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
// DELETE /users/:id
exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    await User.findByIdAndDelete(id);
    res.json({ message: "User deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// PUT /users/:id
exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, role, department } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      id,
      { name, email, role, department },
      { new: true, runValidators: true }
    ).select("-password");

    res.json({ message: "User updated successfully", user: updatedUser });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

