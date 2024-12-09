const AdoptionRequestModel = require("../models/AdoptionRequestModel"); // Import the AdoptionRequest model
const { sendAdoptionApprovalEmail } = require("../utils/emailUtils");

// Fetch all adoption requests
exports.getAllAdoptionRequests = async (req, res) => {
  try {
    const adoptionRequests = await AdoptionRequestModel.getAdoptionRequests();
    console.log(adoptionRequests);  // Log adoption requests to see if data is returned
    res.status(200).json(adoptionRequests);
  } catch (err) {
    console.error("Error fetching adoption requests:", err);  // Log the full error for debugging
    res.status(500).json({
      message: "Error fetching adoption requests.",
      error: err.message,
    });
  }
};

// Add a new adoption request
exports.createAdoptionRequest = async (req, res) => {
    const { email, petId, comments } = req.body;
  
    try {
      await AdoptionRequestModel.addAdoptionRequest({ email, petId, comments });
      res.status(201).json({ message: "Adoption request added successfully!" });
    } catch (err) {
      console.error("Error adding adoption request:", err.message);
      res.status(500).json({
        message: "Error adding adoption request.",
        error: err.message,
      });
    }
  };

// Get adoption request by ID
exports.getAdoptionRequestById = async (req, res) => {
  const requestId = req.params.requestId;

  try {
    const adoptionRequest = await AdoptionRequestModel.getAdoptionRequestById(requestId); // Get adoption request by ID
    if (!adoptionRequest) {
      return res.status(404).json({ message: "Adoption request not found." });
    }
    res.status(200).json(adoptionRequest); // Return adoption request details
  } catch (err) {
    console.error("Error fetching adoption request by ID:", err);
    res.status(500).json({
      message: "Error fetching adoption request by ID.",
      error: err.message,
    });
  }
};

// Update adoption request status
exports.updateAdoptionRequestStatus = async (req, res) => {
  const { requestId, status, userEmail, petName } = req.body;

  try {
    // Update the adoption request status
    await AdoptionRequestModel.updateAdoptionStatus(requestId, status);

    // If the status is "Approved", send the email
    if (status === "Approved") {
      await sendAdoptionApprovalEmail(userEmail, petName);
    }

    res.status(200).json({ message: "Adoption request status updated successfully." });
  } catch (err) {
    console.error("Error updating adoption request status:", err);
    res.status(500).json({
      message: "Error updating adoption request status.",
      error: err.message,
    });
  }
};

// Delete adoption request by ID
exports.deleteAdoptionRequest = async (req, res) => {
  const requestId = req.params.requestId;

  try {
    await AdoptionRequestModel.deleteAdoptionRequest(requestId); // Delete adoption request
    res.status(200).json({ message: "Adoption request deleted successfully!" }); // Success message
  } catch (err) {
    console.error("Error deleting adoption request:", err);
    res.status(500).json({
      message: "Error deleting adoption request.",
      error: err.message,
    });
  }
};
