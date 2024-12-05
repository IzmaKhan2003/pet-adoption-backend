const AdoptionRequestModel = require("../models/AdoptionRequestModel"); // Import the AdoptionRequest model

// Fetch all adoption requests
exports.getAllAdoptionRequests = async (req, res) => {
  try {
    const adoptionRequests = await AdoptionRequestModel.getAdoptionRequests(); // Get all adoption requests
    res.json(adoptionRequests); // Return adoption requests in response
  } catch (err) {
    console.error("Error fetching adoption requests:", err);
    res.status(500).send("Error fetching adoption requests.");
  }
};

// Add a new adoption request
exports.createAdoptionRequest = async (req, res) => {
  const { UserID, PetID, Status } = req.body;

  try {
    await AdoptionRequestModel.addAdoptionRequest({ UserID, PetID, Status }); // Add adoption request
    res.status(201).send("Adoption request added successfully!"); // Success message
  } catch (err) {
    console.error("Error adding adoption request:", err);
    res.status(500).send("Error adding adoption request.");
  }
};

// Get adoption request by ID
exports.getAdoptionRequestById = async (req, res) => {
  const requestId = req.params.requestId;

  try {
    const adoptionRequest = await AdoptionRequestModel.getAdoptionRequestById(requestId); // Get adoption request by ID
    if (!adoptionRequest) {
      return res.status(404).send("Adoption request not found.");
    }
    res.json(adoptionRequest); // Return adoption request details
  } catch (err) {
    console.error("Error fetching adoption request by ID:", err);
    res.status(500).send("Error fetching adoption request by ID.");
  }
};

// Update adoption request status
exports.updateAdoptionStatus = async (req, res) => {
  const requestId = req.params.requestId;
  const { Status } = req.body;

  try {
    await AdoptionRequestModel.updateAdoptionStatus(requestId, Status); // Update adoption request status
    res.send("Adoption request status updated successfully!"); // Success message
  } catch (err) {
    console.error("Error updating adoption request status:", err);
    res.status(500).send("Error updating adoption request status.");
  }
};

// Delete adoption request by ID
exports.deleteAdoptionRequest = async (req, res) => {
  const requestId = req.params.requestId;

  try {
    await AdoptionRequestModel.deleteAdoptionRequest(requestId); // Delete adoption request
    res.send("Adoption request deleted successfully!"); // Success message
  } catch (err) {
    console.error("Error deleting adoption request:", err);
    res.status(500).send("Error deleting adoption request.");
  }
};
