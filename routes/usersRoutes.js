const express = require("express");
const router = express.Router();
const usersController = require("../controllers/usersController"); // Import users controller

// Fetch all users
router.get("/users", usersController.getAllUsers);

// Add a new user
router.post("/users", usersController.createUser);

// Get a specific user by ID
router.get("/users/:userId", usersController.getUserById);

// Update user details by ID
router.put("/users/:userId", usersController.updateUser);

// Delete a user by ID
router.delete("/users/:userId", usersController.deleteUser);

module.exports = router; // Export routes
