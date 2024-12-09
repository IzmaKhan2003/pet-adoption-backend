const HealthRecordModel = require("../models/HealthRecordModel"); // Import the HealthRecord model

// Fetch all health records
exports.getAllHealthRecords = async (req, res) => {
  try {
    const records = await HealthRecordModel.getAllHealthRecords();
    console.log("Health records fetched from DB:", records); // Log data structure
  
    res.status(200).json(records); // Send the records to the client
  } catch (err) {
    console.error("Error fetching health records:", err);
    res.status(500).json({
      message: "Error fetching health records.",
      error: err.message,
    });
  }
};

// Add a new health record
exports.createHealthRecord = async (req, res) => {
  const { PetID, Details, History } = req.body;

  try {
    await HealthRecordModel.addHealthRecord({ PetID, Details, History }); // Add health record
    res.status(201).json({
      message: "Health record added successfully!",
    }); // Success message
  } catch (err) {
    console.error("Error adding health record:", err);
    res.status(500).json({
      message: "Error adding health record.",
      error: err.message,
    });
  }
};

// Get health record by ID
exports.getHealthRecordById = async (req, res) => {
  const petId = req.params.petId;

  try {
    const healthRecord = await HealthRecordModel.getHealthRecordById(petId); // Get health record by ID
    if (!healthRecord) {
      return res.status(404).json({ message: "Health record not found." });
    }
    res.status(200).json(healthRecord); // Return health record details
  } catch (err) {
    console.error("Error fetching health record by ID:", err);
    res.status(500).json({
      message: "Error fetching health record by ID.",
      error: err.message,
    });
  }
};

// Update health record details
exports.updateHealthRecord = async (req, res) => {
  const petId = req.params.petId;
  const { Details, History } = req.body;

  try {
    await HealthRecordModel.updateHealthRecord(petId, { Details, History }); // Update health record
    res.status(200).json({ message: "Health record updated successfully!" }); // Success message
  } catch (err) {
    console.error("Error updating health record:", err);
    res.status(500).json({
      message: "Error updating health record.",
      error: err.message,
    });
  }
};

// Delete health record by ID
exports.deleteHealthRecord = async (req, res) => {
  const petId = req.params.healthId;

  try {
    await HealthRecordModel.deleteHealthRecord(petId); // Delete health record
    res.status(200).json({ message: "Health record deleted successfully!" }); // Success message
  } catch (err) {
    console.error("Error deleting health record:", err);
    res.status(500).json({
      message: "Error deleting health record.",
      error: err.message,
    });
  }
};


  