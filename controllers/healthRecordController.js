const HealthRecordModel = require("../models/HealthRecordModel"); // Import the HealthRecord model

// Fetch all health records
exports.getAllHealthRecords = async (req, res) => {
    try {
      const records = await HealthRecordModel.getAllHealthRecords();
      console.log("Health records fetched from DB:", records); // Log data structure
  
      res.json(records); // Send the records to the client
    } catch (err) {
      console.error("Error fetching health records:", err);
      res.status(500).send("Error fetching health records.");
    }
  };
  

// Add a new health record
exports.createHealthRecord = async (req, res) => {
  const { PetID, Details, History } = req.body;

  try {
    await HealthRecordModel.addHealthRecord({ PetID, Details, History }); // Add health record
    res.status(201).send("Health record added successfully!"); // Success message
  } catch (err) {
    console.error("Error adding health record:", err);
    res.status(500).send("Error adding health record.");
  }
};

// Get health record by ID
exports.getHealthRecordById = async (req, res) => {
  const healthId = req.params.healthId;

  try {
    const healthRecord = await HealthRecordModel.getHealthRecordById(healthId); // Get health record by ID
    if (!healthRecord) {
      return res.status(404).send("Health record not found.");
    }
    res.json(healthRecord); // Return health record details
  } catch (err) {
    console.error("Error fetching health record by ID:", err);
    res.status(500).send("Error fetching health record by ID.");
  }
};

// Update health record details
exports.updateHealthRecord = async (req, res) => {
  const healthId = req.params.healthId;
  const { Details, History } = req.body;

  try {
    await HealthRecordModel.updateHealthRecord(healthId, { Details, History }); // Update health record
    res.send("Health record updated successfully!"); // Success message
  } catch (err) {
    console.error("Error updating health record:", err);
    res.status(500).send("Error updating health record.");
  }
};

// Delete health record by ID
exports.deleteHealthRecord = async (req, res) => {
  const healthId = req.params.healthId;

  try {
    await HealthRecordModel.deleteHealthRecord(healthId); // Delete health record
    res.send("Health record deleted successfully!"); // Success message
  } catch (err) {
    console.error("Error deleting health record:", err);
    res.status(500).send("Error deleting health record.");
  }
};
