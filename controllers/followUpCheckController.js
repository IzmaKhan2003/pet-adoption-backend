const FollowUpCheckModel = require("../models/FollowUpCheckModel"); // Import the FollowUpCheck model

// Fetch all follow-up checks
exports.getAllFollowUpChecks = async (req, res) => {
  try {
    const followUpChecks = await FollowUpCheckModel.getFollowUpChecks(); // Get all follow-up checks
    res.json(followUpChecks); // Return the follow-up checks in the response as JSON
  } catch (err) {
    console.error("Error fetching follow-up checks:", err);
    res.status(500).send("Error fetching follow-up checks.");
  }
};

// Add a new follow-up check
exports.createFollowUpCheck = async (req, res) => {
  const { PetID, CheckDate, Notes, UserID } = req.body;

  try {
    await FollowUpCheckModel.addFollowUpCheck({ PetID, CheckDate, Notes, UserID }); // Add the follow-up check
    res.status(201).send("Follow-up check added successfully!"); // Success message
  } catch (err) {
    console.error("Error adding follow-up check:", err);
    res.status(500).send("Error adding follow-up check.");
  }
};

// Get a follow-up check by ID
exports.getFollowUpCheckById = async (req, res) => {
  const checkId = req.params.checkId;

  try {
    const followUpCheck = await FollowUpCheckModel.getFollowUpCheckById(checkId); // Get follow-up check by ID
    if (!followUpCheck) {
      return res.status(404).send("Follow-up check not found.");
    }
    res.json(followUpCheck); // Return the follow-up check details
  } catch (err) {
    console.error("Error fetching follow-up check by ID:", err);
    res.status(500).send("Error fetching follow-up check by ID.");
  }
};

// Update follow-up check details
exports.updateFollowUpCheck = async (req, res) => {
  const checkId = req.params.checkId;
  const { CheckDate, Notes, UserID } = req.body;

  try {
    await FollowUpCheckModel.updateFollowUpCheck(checkId, { CheckDate, Notes, UserID }); // Update follow-up check details
    res.send("Follow-up check updated successfully!"); // Success message
  } catch (err) {
    console.error("Error updating follow-up check:", err);
    res.status(500).send("Error updating follow-up check.");
  }
};

// Delete a follow-up check by ID
exports.deleteFollowUpCheck = async (req, res) => {
  const checkId = req.params.checkId;

  try {
    await FollowUpCheckModel.deleteFollowUpCheck(checkId); // Delete follow-up check
    res.send("Follow-up check deleted successfully!"); // Success message
  } catch (err) {
    console.error("Error deleting follow-up check:", err);
    res.status(500).send("Error deleting follow-up check.");
  }
};
