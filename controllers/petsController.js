const PetModel = require("../models/PetModel"); // Import the Pet model

// Fetch all pets
exports.getAllPets = async (req, res) => {
  try {
    const pets = await PetModel.getPets(); // Call model function to get pets
    res.json(pets); // Send the response back with the fetched pets
  } catch (err) {
    console.error("Error fetching pets:", err);
    res.status(500).send("Error fetching pets.");
  }
};

// Add a new pet
exports.createPet = async (req, res) => {
    const { PetName, PetType, Breed, Age, PetSize, Gender, HealthStatus, VaccinationStatus, Availability } = req.body;
  
    console.log("Received Data:", { PetName, PetType, Breed, Age, PetSize, Gender, HealthStatus, VaccinationStatus, Availability });

    // Validate that PetName is provided
    if (!PetName) {
      return res.status(400).send("PetName is required");
    }
  
    // Validate other fields (optional, but recommended)
    if (!PetType || !Breed || !Age || !PetSize || !Gender || !HealthStatus || !VaccinationStatus || !Availability) {
      return res.status(400).send("All pet details are required.");
    }
  
    try {
      await PetModel.addPet({ PetName, PetType, Breed, Age, PetSize, Gender, HealthStatus, VaccinationStatus, Availability });
      res.status(201).send("Pet added successfully!");
    } catch (err) {
      console.error("Error adding pet:", err);
      res.status(500).send("Error adding pet.");
    }
  };

// Get a specific pet by ID
exports.getPetById = async (req, res) => {
  const petId = req.params.petId;

  try {
    const pet = await PetModel.getPetById(petId); // Call model function to get pet by ID
    if (!pet) {
      return res.status(404).send("Pet not found.");
    }
    res.json(pet); // Return pet details
  } catch (err) {
    console.error("Error fetching pet by ID:", err);
    res.status(500).send("Error fetching pet by ID.");
  }
};

// Update pet details by ID
exports.updatePet = async (req, res) => {
  const petId = req.params.petId;
  const { PetName, PetType, Breed, Age, PetSize, Gender, HealthStatus, VaccinationStatus, Availability } = req.body;

  try {
    await PetModel.updatePet(petId, { PetName, PetType, Breed, Age, PetSize, Gender, HealthStatus, VaccinationStatus, Availability }); // Call model function
    res.send("Pet updated successfully!");
  } catch (err) {
    console.error("Error updating pet:", err);
    res.status(500).send("Error updating pet.");
  }
};

// Delete a pet by ID
exports.deletePet = async (req, res) => {
  const petId = req.params.petId;

  try {
    await PetModel.deletePet(petId); // Call model function to delete pet
    res.send("Pet deleted successfully!");
  } catch (err) {
    console.error("Error deleting pet:", err);
    res.status(500).send("Error deleting pet.");
  }
};

// Get pets based on availability (Available/Adopted)
exports.getPetsByAvailability = async (req, res) => {
  const status = req.params.status;

  try {
    const pets = await PetModel.getPetsByAvailability(status); // Call model function
    res.json(pets); // Return pets with the given availability
  } catch (err) {
    console.error("Error fetching pets by availability:", err);
    res.status(500).send("Error fetching pets by availability.");
  }
};
