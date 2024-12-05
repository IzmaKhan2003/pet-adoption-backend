const { getConnection } = require("../config/db"); // Import the connection pool

// Fetch all pets
async function getPets() {
  const connection = await getConnection(); // Get connection from the pool
  try {
    const result = await connection.execute("SELECT * FROM Pet"); // Execute query
    return result.rows; // Return the result of the query
  } catch (err) {
    throw new Error("Error fetching pets: " + err.message);
  } finally {
    await connection.close(); // Close the connection
  }
}

// Add a new pet
async function addPet(petDetails) {
    const connection = await getConnection();
    const { PetName, PetType, Breed, Age, PetSize, Gender, HealthStatus, VaccinationStatus, Availability } = petDetails;
  
    console.log("Inserting Pet Data:", { PetName, PetType, Breed, Age, PetSize, Gender, HealthStatus, VaccinationStatus, Availability });

    try {
      const sql = `
        INSERT INTO Pet (PetName, PetType, Breed, Age, PetSize, Gender, HealthStatus, VaccinationStatus, Availability)
        VALUES (:PetName, :PetType, :Breed, :Age, :PetSize, :Gender, :HealthStatus, :VaccinationStatus, :Availability)
      `;
      await connection.execute(sql, { PetName, PetType, Breed, Age, PetSize, Gender, HealthStatus, VaccinationStatus, Availability }, { autoCommit: true });
    } catch (err) {
      throw new Error("Error adding pet: " + err.message);
    } finally {
      await connection.close(); // Close the connection
    }
  }

// Fetch a pet by ID
async function getPetById(petId) {
  const connection = await getConnection();
  try {
    const result = await connection.execute(
      "SELECT * FROM Pet WHERE PetID = :petId", 
      [petId] // Bind the petId parameter
    );
    return result.rows[0]; // Return the pet with the specified ID
  } catch (err) {
    throw new Error("Error fetching pet by ID: " + err.message);
  } finally {
    await connection.close(); // Close the connection
  }
}

// Update a pet's details
async function updatePet(petId, petDetails) {
  const connection = await getConnection();
  const { PetName, PetType, Breed, Age, PetSize, Gender, HealthStatus, VaccinationStatus, Availability } = petDetails;

  try {
    const sql = `
      UPDATE Pet
      SET PetName = :PetName,
          PetType = :PetType,
          Breed = :Breed,
          Age = :Age,
          PetSize = :PetSize,
          Gender = :Gender,
          HealthStatus = :HealthStatus,
          VaccinationStatus = :VaccinationStatus,
          Availability = :Availability
      WHERE PetID = :petId
    `;
    await connection.execute(sql, { PetName, PetType, Breed, Age, PetSize, Gender, HealthStatus, VaccinationStatus, Availability, petId }, { autoCommit: true });
  } catch (err) {
    throw new Error("Error updating pet: " + err.message);
  } finally {
    await connection.close(); // Close the connection
  }
}

// Delete a pet by ID
async function deletePet(petId) {
  const connection = await getConnection();
  try {
    const sql = "DELETE FROM Pet WHERE PetID = :petId";
    await connection.execute(sql, [petId], { autoCommit: true });
  } catch (err) {
    throw new Error("Error deleting pet: " + err.message);
  } finally {
    await connection.close(); // Close the connection
  }
}

// Fetch pets based on availability status (Available, Adopted)
async function getPetsByAvailability(status) {
  const connection = await getConnection();
  try {
    const result = await connection.execute(
      "SELECT * FROM Pet WHERE Availability = :status",
      [status] // Bind the availability status parameter
    );
    return result.rows; // Return the result of the query
  } catch (err) {
    throw new Error("Error fetching pets by availability: " + err.message);
  } finally {
    await connection.close(); // Close the connection
  }
}

module.exports = {
  getPets,
  addPet,
  getPetById,
  updatePet,
  deletePet,
  getPetsByAvailability
};
