const { getConnection } = require("../config/db"); // Import the connection pool

// Fetch all admins
async function getAdmins() {
  const connection = await getConnection(); // Get connection from the pool
  try {
    const result = await connection.execute("SELECT * FROM Admin"); // Fetch all admins
    return result.rows; // Return only the rows containing admin data
  } catch (err) {
    throw new Error("Error fetching admins: " + err.message);
  } finally {
    await connection.close(); // Close the connection
  }
}

// Fetch admin by ID
async function getAdminById(adminId) {
  const connection = await getConnection();
  try {
    const result = await connection.execute(
      "SELECT * FROM Admin WHERE AdminID = :adminId", 
      [adminId] // Bind the adminId parameter
    );
    return result.rows[0]; // Return the admin with the specified ID
  } catch (err) {
    throw new Error("Error fetching admin by ID: " + err.message);
  } finally {
    await connection.close(); // Close the connection
  }
}

// Update admin details
async function updateAdmin(adminId, adminDetails) {
  const connection = await getConnection();
  const { Name, Email, Password } = adminDetails;

  try {
    const sql = `
      UPDATE Admin
      SET Name = :Name, Email = :Email, Password = :Password
      WHERE AdminID = :adminId
    `;
    await connection.execute(sql, { Name, Email, Password, adminId }, { autoCommit: true });
  } catch (err) {
    throw new Error("Error updating admin: " + err.message);
  } finally {
    await connection.close(); // Close the connection
  }
}

// Delete admin by ID
async function deleteAdmin(adminId) {
  const connection = await getConnection();
  try {
    const sql = "DELETE FROM Admin WHERE AdminID = :adminId";
    await connection.execute(sql, [adminId], { autoCommit: true });
  } catch (err) {
    throw new Error("Error deleting admin: " + err.message);
  } finally {
    await connection.close(); // Close the connection
  }
}

module.exports = { getAdmins, getAdminById, updateAdmin, deleteAdmin };
