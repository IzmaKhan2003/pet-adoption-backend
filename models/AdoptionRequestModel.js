const { getConnection } = require("../config/db"); // Import the connection pool
const oracledb = require("oracledb");

// Fetch all adoption requests
async function getAdoptionRequests() {
  const connection = await getConnection(); // Get connection from the pool
  try {
    const result = await connection.execute("SELECT * FROM AdoptionRequest"); // Execute query without schema prefix
    return result.rows; // Return the result of the query
  } catch (err) {
    throw new Error("Error fetching adoption requests: " + err.message);
  } finally {
    await connection.close(); // Close the connection
  }
}

// Add a new adoption request
async function addAdoptionRequest(requestDetails) {
  const connection = await getConnection();
  const { UserID, PetID, Status } = requestDetails;

  try {
    const sql = `
      INSERT INTO AdoptionRequest (UserID, PetID, Status)
      VALUES (:UserID, :PetID, :Status)
    `;
    await connection.execute(sql, { UserID, PetID, Status }, { autoCommit: true });
  } catch (err) {
    throw new Error("Error adding adoption request: " + err.message);
  } finally {
    await connection.close(); // Close the connection
  }
}

// Get adoption request by ID
async function getAdoptionRequestById(requestId) {
  const connection = await getConnection();
  try {
    const result = await connection.execute(
      "SELECT * FROM AdoptionRequest WHERE RequestID = :requestId", 
      [requestId] // Bind the requestId parameter
    );
    return result.rows[0]; // Return the adoption request with the specified ID
  } catch (err) {
    throw new Error("Error fetching adoption request by ID: " + err.message);
  } finally {
    await connection.close(); // Close the connection
  }
}

// Function to update adoption request status
async function updateAdoptionStatus(requestId, status) {
    const connection = await oracledb.getConnection();
    
    const sql = `
      UPDATE AdoptionRequest
      SET Status = :status
      WHERE RequestID = :requestId
    `;
  
    const binds = {
      status,
      requestId
    };
  
    try {
      const result = await connection.execute(sql, binds, { autoCommit: true });
      console.log(`${result.rowsAffected} row(s) updated`);
      return result;
    } catch (err) {
      console.error("Error updating adoption request status:", err);
      throw err;  // Ensure error is thrown for further handling
    } finally {
      await connection.close();
    }
  }

// Delete an adoption request by ID
async function deleteAdoptionRequest(requestId) {
  const connection = await getConnection();
  try {
    const sql = "DELETE FROM AdoptionRequest WHERE RequestID = :requestId";
    await connection.execute(sql, [requestId], { autoCommit: true });
  } catch (err) {
    throw new Error("Error deleting adoption request: " + err.message);
  } finally {
    await connection.close(); // Close the connection
  }
}

module.exports = { getAdoptionRequests, addAdoptionRequest, getAdoptionRequestById, updateAdoptionStatus, deleteAdoptionRequest };
