const PetModel = require("../models/PetModel"); // Import the Pet model

// Fetch all pets
exports.getAllPets = async (req, res) => {
  try {
    const pets = await PetModel.getPets(); // Call model function to get pets
    res.status(200).json(pets); // Send the response back with the fetched pets
  } catch (err) {
    console.error("Error fetching pets:", err);
    res.status(500).json({
      message: "Error fetching pets.",
      error: err.message,
    });
  }
};

// Add a new pet
exports.createPet = async (req, res) => {
  const { PetName, PetType, Breed, Age, PetSize, Gender, HealthStatus, VaccinationStatus, Availability } = req.body;

  console.log("Received Data:", { PetName, PetType, Breed, Age, PetSize, Gender, HealthStatus, VaccinationStatus, Availability });

  // Validate that all required fields are provided
  if (!PetName || !PetType || !Breed || !Age || !PetSize || !Gender || !HealthStatus || !VaccinationStatus || !Availability) {
    return res.status(400).json({ message: "All pet details are required." });
  }

  try {
    // Add the pet to the database
    const newPet = await PetModel.addPet({
      PetName,
      PetType,
      Breed,
      Age,
      PetSize,
      Gender,
      HealthStatus,
      VaccinationStatus,
      Availability,
    });

    // Send a JSON response
    res.status(201).json({
      message: "Pet added successfully!",
      pet: newPet, // Optionally include the newly added pet details
    });
  } catch (err) {
    console.error("Error adding pet:", err);
    res.status(500).json({
      message: "Error adding pet.",
      error: err.message,
    });
  }
};

// Get a specific pet by ID
exports.getPetById = async (req, res) => {
  const petId = req.params.petId;

  try {
    const pet = await PetModel.getPetById(petId); // Call model function to get pet by ID
    if (!pet) {
      return res.status(404).json({ message: "Pet not found." });
    }
    res.status(200).json(pet); // Return pet details
  } catch (err) {
    console.error("Error fetching pet by ID:", err);
    res.status(500).json({
      message: "Error fetching pet by ID.",
      error: err.message,
    });
  }
};

// Update pet details by ID
exports.updatePet = async (req, res) => {
  const petId = req.params.petId;
  const { PetName, PetType, Breed, Age, PetSize, Gender, HealthStatus, VaccinationStatus, Availability } = req.body;

  try {
    await PetModel.updatePet(petId, { PetName, PetType, Breed, Age, PetSize, Gender, HealthStatus, VaccinationStatus, Availability }); // Call model function
    res.status(200).json({ message: "Pet updated successfully!" });
  } catch (err) {
    console.error("Error updating pet:", err);
    res.status(500).json({
      message: "Error updating pet.",
      error: err.message,
    });
  }
};

// Delete a pet by ID
exports.deletePet = async (req, res) => {
  const petId = req.params.petId;

  try {
    await PetModel.deletePet(petId); // Call model function to delete pet
    res.status(200).json({ message: "Pet deleted successfully!" });
  } catch (err) {
    console.error("Error deleting pet:", err);
    res.status(500).json({
      message: "Error deleting pet.",
      error: err.message,
    });
  }
};

// Get pets based on availability (Available/Adopted)
exports.getPetsByAvailability = async (req, res) => {
  const status = req.params.status;

  try {
    const pets = await PetModel.getPetsByAvailability(status); // Call model function
    res.status(200).json(pets); // Return pets with the given availability
  } catch (err) {
    console.error("Error fetching pets by availability:", err);
    res.status(500).json({
      message: "Error fetching pets by availability.",
      error: err.message,
    });
  }
};
