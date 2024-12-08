const AdminModel = require("../models/AdminModel"); // Import Admin model

// Fetch all admins
exports.getAllAdmins = async (req, res) => {
  try {
    const admins = await AdminModel.getAdmins();
    res.status(200).json(admins); // Return admins in response
  } catch (err) {
    res.status(500).json({
      message: "Error fetching admins.",
      error: err.message,
    });
  }
};

// Fetch admin by ID
exports.getAdminById = async (req, res) => {
  const adminId = req.params.adminId;
  try {
    const admin = await AdminModel.getAdminById(adminId);
    if (!admin) {
      return res.status(404).json({ message: "Admin not found." });
    }
    res.status(200).json(admin); // Return admin details
  } catch (err) {
    res.status(500).json({
      message: "Error fetching admin by ID.",
      error: err.message,
    });
  }
};

// Update admin details
exports.updateAdmin = async (req, res) => {
  const adminId = req.params.adminId;
  const { Name, Email, Password } = req.body;
  try {
    await AdminModel.updateAdmin(adminId, { Name, Email, Password });
    res.status(200).json({
      message: "Admin updated successfully!",
    }); // Success message
  } catch (err) {
    res.status(500).json({
      message: "Error updating admin.",
      error: err.message,
    });
  }
};

// Delete admin by ID
exports.deleteAdmin = async (req, res) => {
  const adminId = req.params.adminId;
  try {
    await AdminModel.deleteAdmin(adminId);
    res.status(200).json({ message: "Admin deleted successfully!" }); // Success message
  } catch (err) {
    res.status(500).json({
      message: "Error deleting admin.",
      error: err.message,
    });
  }
};
