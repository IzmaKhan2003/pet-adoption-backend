const express = require("express");
const router = express.Router();
const adoptionRequestsController = require("../controllers/adoptionRequestsController"); // Import controller
const isAdmin = require("../middlewares/isAdmin");
// Fetch all adoption requests
router.get("/adoption-requests", adoptionRequestsController.getAllAdoptionRequests);

// Add a new adoption request
router.post("/adoption-requests", adoptionRequestsController.createAdoptionRequest);

// Get adoption request by ID
router.get("/adoption-requests/:requestId", adoptionRequestsController.getAdoptionRequestById);

// Update adoption request status
router.put("/adoption-requests/:requestId", isAdmin, adoptionRequestsController.updateAdoptionStatus);

// Delete adoption request by ID
router.delete("/adoption-requests/:requestId", adoptionRequestsController.deleteAdoptionRequest);

module.exports = router; // Export routes
