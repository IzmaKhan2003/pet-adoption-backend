const express = require("express");
const router = express.Router();
const usersController = require("../controllers/usersController"); // Import users controller
const isSelfOrAdmin = require("../middlewares/isSelfOrAdmin");
const isAdmin = require("../middlewares/isAdmin");

// Fetch all users
router.get("/users", isAdmin, usersController.getAllUsers);

// Add a new user
router.post("/users", usersController.createUser);

// Allow Admins or the user themselves to access the route
router.get("/:userId", isSelfOrAdmin, usersController.getUserById);

// Update user details by ID
router.put("/users/:userId", usersController.updateUser);

// Delete a user by ID
router.delete("/users/:userId", usersController.deleteUser);

module.exports = router; // Export routes
