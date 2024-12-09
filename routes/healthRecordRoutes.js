const express = require("express");
const router = express.Router();
const healthRecordController = require("../controllers/healthRecordController"); // Import controller

// Fetch all health records
router.get("/health-records", healthRecordController.getAllHealthRecords);

// Add a new health record
router.post("/health-records", healthRecordController.createHealthRecord);

// Get health record by ID
router.get("/health-records/:petID", healthRecordController.getHealthRecordById);

// Update health record details by ID
router.put("/health-records/:petID", healthRecordController.updateHealthRecord);

// Delete health record by ID
router.delete("/health-records/:petID", healthRecordController.deleteHealthRecord);

module.exports = router; // Export routes
