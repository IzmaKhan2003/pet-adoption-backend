const express = require("express");
const router = express.Router();
const petsController = require("../controllers/petsController"); // Import controller

// Fetch all pets
router.get("/pets", petsController.getAllPets);

// Add a new pet
router.post("/pets", petsController.createPet);

// Get a specific pet by ID
router.get("/pets/:petId", petsController.getPetById);

// Update pet details by ID
router.put("/pets/:petId", petsController.updatePet);

// Delete a pet by ID
router.delete("/pets/:petId", petsController.deletePet);

// Get pets based on availability status (Available/Adopted)
router.get("/pets/availability/:status", petsController.getPetsByAvailability);

module.exports = router; // Export routes
