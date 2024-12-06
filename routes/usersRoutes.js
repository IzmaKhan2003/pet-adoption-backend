const express = require("express");
const router = express.Router();
const usersController = require("../controllers/usersController"); // Import users controller
const isSelfOrAdmin = require("../middlewares/isSelfOrAdmin");
// Fetch all users
router.get("/users", usersController.getAllUsers);

// Add a new user
router.post("/users", usersController.createUser);

// Allow Admins or the user themselves to access the route
router.get("/:userId", isSelfOrAdmin, usersController.getUserById);

// Update user details by ID
router.put("/users/:userId", usersController.updateUser);

// Delete a user by ID
router.delete("/users/:userId", usersController.deleteUser);

module.exports = router; // Export routes
