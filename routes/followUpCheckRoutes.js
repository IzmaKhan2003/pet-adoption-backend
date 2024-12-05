const express = require("express");
const router = express.Router();
const followUpCheckController = require("../controllers/followUpCheckController"); // Import the controller

// Fetch all follow-up checks
router.get("/follow-up-checks", followUpCheckController.getAllFollowUpChecks);

// Add a new follow-up check
router.post("/follow-up-checks", followUpCheckController.createFollowUpCheck);

// Get follow-up check by ID
router.get("/follow-up-checks/:checkId", followUpCheckController.getFollowUpCheckById);

// Update follow-up check by ID
router.put("/follow-up-checks/:checkId", followUpCheckController.updateFollowUpCheck);

// Delete follow-up check by ID
router.delete("/follow-up-checks/:checkId", followUpCheckController.deleteFollowUpCheck);

module.exports = router; // Export the routes
