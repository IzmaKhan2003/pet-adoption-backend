const { getConnection } = require("../config/db"); // Import the connection pool

// Fetch all health records
async function getAllHealthRecords() {
    const connection = await getConnection();
  
    try {
      const result = await connection.execute("SELECT * FROM HealthRecord");
      // Extract only the rows from the result
      return result.rows; 
    } catch (err) {
      throw new Error("Error fetching health records: " + err.message);
    } finally {
      await connection.close();
    }
  }
  

// Add a new health record
async function addHealthRecord(healthRecordDetails) {
  const connection = await getConnection();
  const { PetID, Details, History } = healthRecordDetails;

  try {
    const sql = `
      INSERT INTO HealthRecord (PetID, Details, History)
      VALUES (:PetID, :Details, :History)
    `;
    await connection.execute(sql, { PetID, Details, History }, { autoCommit: true });
  } catch (err) {
    throw new Error("Error adding health record: " + err.message);
  } finally {
    await connection.close(); // Close the connection
  }
}

// Get a health record by ID
async function getHealthRecordById(petId) {
  const connection = await getConnection();
  try {
    const result = await connection.execute(
      "SELECT * FROM HealthRecord WHERE PetID = :petId", 
      [petId] // Bind the healthId parameter
    );
    return result.rows[0]; // Return the health record with the specified ID
  } catch (err) {
    throw new Error("Error fetching health record by petID: " + err.message);
  } finally {
    await connection.close(); // Close the connection
  }
}

// Update health record details
async function updateHealthRecord(petId, healthRecordDetails) {
  const connection = await getConnection();
  const { Details, History } = healthRecordDetails;

  try {
    const sql = `
      UPDATE HealthRecord
      SET Details = :Details, History = :History
      WHERE PetID = :petId
    `;
    await connection.execute(sql, { Details, History, petId }, { autoCommit: true });
  } catch (err) {
    throw new Error("Error updating health record: " + err.message);
  } finally {
    await connection.close(); // Close the connection
  }
}

// Delete a health record by ID
async function deleteHealthRecord(petId) {
  const connection = await getConnection();
  try {
    const sql = "DELETE FROM HealthRecord WHERE PetID = :petId";
    await connection.execute(sql, [petId], { autoCommit: true });
  } catch (err) {
    throw new Error("Error deleting health record: " + err.message);
  } finally {
    await connection.close(); // Close the connection
  }
}


  module.exports = { getAllHealthRecords, addHealthRecord, getHealthRecordById, updateHealthRecord, deleteHealthRecord};
  


