const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController"); // Ensure the correct path to the controller

// Fetch all admins
router.get("/admins", adminController.getAllAdmins);

// Fetch admin by ID
router.get("/admins/:adminId", adminController.getAdminById);

// Update admin details
router.put("/admins/:adminId", adminController.updateAdmin);

// Delete admin by ID
router.delete("/admins/:adminId", adminController.deleteAdmin);

module.exports = router; // Ensure the router is exported
