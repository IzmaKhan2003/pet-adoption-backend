const { getConnection } = require("../config/db"); // Import the connection pool

// Fetch all follow-up checks
async function getFollowUpChecks() {
  const connection = await getConnection(); // Get connection from the pool
  try {
    const result = await connection.execute("SELECT * FROM FollowUpCheck"); // Fetch all follow-up check records
    return result.rows; // Return only the rows containing follow-up check data
  } catch (err) {
    throw new Error("Error fetching follow-up checks: " + err.message);
  } finally {
    await connection.close(); // Close the connection
  }
}

// Add a new follow-up check
async function addFollowUpCheck(followUpCheckDetails) {
  const connection = await getConnection();
  const { PetID, CheckDate, Notes, UserID } = followUpCheckDetails;

  try {
    const sql = `
      INSERT INTO FollowUpCheck (PetID, CheckDate, Notes, UserID)
      VALUES (:PetID, :CheckDate, :Notes, :UserID)
    `;
    await connection.execute(sql, { PetID, CheckDate, Notes, UserID }, { autoCommit: true });
  } catch (err) {
    throw new Error("Error adding follow-up check: " + err.message);
  } finally {
    await connection.close(); // Close the connection
  }
}

// Get a follow-up check by ID
async function getFollowUpCheckById(checkId) {
  const connection = await getConnection();
  try {
    const result = await connection.execute(
      "SELECT * FROM FollowUpCheck WHERE CheckID = :checkId", 
      [checkId] // Bind the checkId parameter
    );
    return result.rows[0]; // Return the follow-up check with the specified ID
  } catch (err) {
    throw new Error("Error fetching follow-up check by ID: " + err.message);
  } finally {
    await connection.close(); // Close the connection
  }
}

// Update follow-up check details
async function updateFollowUpCheck(checkId, followUpCheckDetails) {
  const connection = await getConnection();
  const { CheckDate, Notes, UserID } = followUpCheckDetails;

  try {
    const sql = `
      UPDATE FollowUpCheck
      SET CheckDate = :CheckDate, Notes = :Notes, UserID = :UserID
      WHERE CheckID = :checkId
    `;
    await connection.execute(sql, { CheckDate, Notes, UserID, checkId }, { autoCommit: true });
  } catch (err) {
    throw new Error("Error updating follow-up check: " + err.message);
  } finally {
    await connection.close(); // Close the connection
  }
}

// Delete a follow-up check by ID
async function deleteFollowUpCheck(checkId) {
  const connection = await getConnection();
  try {
    const sql = "DELETE FROM FollowUpCheck WHERE CheckID = :checkId";
    await connection.execute(sql, [checkId], { autoCommit: true });
  } catch (err) {
    throw new Error("Error deleting follow-up check: " + err.message);
  } finally {
    await connection.close(); // Close the connection
  }
}

module.exports = { getFollowUpChecks, addFollowUpCheck, getFollowUpCheckById, updateFollowUpCheck, deleteFollowUpCheck };
