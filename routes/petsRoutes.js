const express = require("express");
const router = express.Router();
const isAdmin = require("../middlewares/isAdmin");
const petsController = require("../controllers/petsController"); // Import controller

console.log("isAdmin Middleware:", isAdmin);
console.log("Pet Controller:", petsController);

// Fetch all pets
router.get("/pets", petsController.getAllPets);
// Get pets based on availability status (Available/Adopted)
router.get("/pets/availability/:status", petsController.getPetsByAvailability);


// Admin-only 
//route to create a pet
router.post("/create-pet", isAdmin, petsController.createPet);
// Get a specific pet by ID
router.get("/getpets/:petId",isAdmin, petsController.getPetById);
// Update pet details by ID
router.put("/pets/:petId", isAdmin, petsController.updatePet);
// Delete a pet by ID
router.delete("/pets/:petId", isAdmin, petsController.deletePet);


module.exports = router; // Export routes
