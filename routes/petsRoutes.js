const express = require("express");
const router = express.Router();
const petsController = require("../controllers/petsController"); // Import controller
const isAdmin = require("../middlewares/isAdmin");

// Fetch all pets
router.get("/pets", petsController.getAllPets);

// Admin-only route to create a pet
router.post("/create", isAdmin, petController.createPet);

// Get a specific pet by ID
router.get("/pets/:petId", petsController.getPetById);

// Update pet details by ID
router.put("/pets/:petId", petsController.updatePet);

// Delete a pet by ID
router.delete("/pets/:petId", petsController.deletePet);

// Get pets based on availability status (Available/Adopted)
router.get("/pets/availability/:status", petsController.getPetsByAvailability);

module.exports = router; // Export routes
