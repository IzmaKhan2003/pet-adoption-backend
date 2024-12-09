const { getConnection } = require("../config/db"); // Import the connection pool
const oracledb = require("oracledb");
const { getUserByEmail } = require('./UserModel'); // Use './' for files in the same directory

   // Importing getUserByEmail


async function addAdoptionRequest({ email, petId, comments }) {
  const connection = await getConnection();

  try {
    const user = await getUserByEmail(email);
    if (!user) {
      throw new Error("User not found with the provided email");
    }

    const userId = user.UserID;
    const status = "Pending";

    const sql = `
      INSERT INTO AdoptionRequest (UserID, PetID, Status)
      VALUES (:userId, :petId, :status)
    `;
    await connection.execute(sql, { userId, petId, status }, { autoCommit: true });
  } catch (err) {
    throw new Error(`Error creating adoption request: ${err.message}`);
  } finally {
    await connection.close();
  }
}

// Fetch all adoption requests
async function getAdoptionRequests() {
    const connection = await getConnection();
    try {
      const result = await connection.execute("SELECT * FROM AdoptionRequest");
      console.log(result.rows); // Log the rows to verify the fetched data
      return result.rows;
    } catch (err) {
      throw new Error("Error fetching adoption requests: " + err.message);
    } finally {
      await connection.close();
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

module.exports = { getAdoptionRequests, addAdoptionRequest,updateAdoptionStatus, deleteAdoptionRequest};
