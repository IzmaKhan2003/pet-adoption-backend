const AdminModel = require("../models/AdminModel"); // Import Admin model

// Fetch all admins
exports.getAllAdmins = async (req, res) => {
  try {
    const admins = await AdminModel.getAdmins();
    res.json(admins);
  } catch (err) {
    res.status(500).send("Error fetching admins: " + err.message);
  }
};

// Fetch admin by ID
exports.getAdminById = async (req, res) => {
  const adminId = req.params.adminId;
  try {
    const admin = await AdminModel.getAdminById(adminId);
    if (!admin) return res.status(404).send("Admin not found.");
    res.json(admin);
  } catch (err) {
    res.status(500).send("Error fetching admin by ID: " + err.message);
  }
};

// Update admin details
exports.updateAdmin = async (req, res) => {
  const adminId = req.params.adminId;
  const { Name, Email, Password } = req.body;
  try {
    await AdminModel.updateAdmin(adminId, { Name, Email, Password });
    res.send("Admin updated successfully!");
  } catch (err) {
    res.status(500).send("Error updating admin: " + err.message);
  }
};

// Delete admin by ID
exports.deleteAdmin = async (req, res) => {
  const adminId = req.params.adminId;
  try {
    await AdminModel.deleteAdmin(adminId);
    res.send("Admin deleted successfully!");
  } catch (err) {
    res.status(500).send("Error deleting admin: " + err.message);
  }
};
