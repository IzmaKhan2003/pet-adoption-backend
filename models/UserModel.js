const { getConnection } = require("../config/db"); // Import the connection pool

// Fetch all users
async function getUsers() {
  const connection = await getConnection(); // Get connection from the pool
  try {
    const result = await connection.execute("SELECT * FROM Users"); // Execute query
    return result.rows; // Return the result of the query
  } catch (err) {
    throw new Error("Error fetching users: " + err.message);
  } finally {
    await connection.close(); // Close the connection
  }
}

// Add a new user
async function addUser(userDetails) {
  const connection = await getConnection();
  const { Name, Email, Password, Phone, Address, UserType } = userDetails;

  try {
    const sql = `
      INSERT INTO Users (Name, Email, Password, Phone, Address, UserType)
      VALUES (:Name, :Email, :Password, :Phone, :Address, :UserType)
    `;
    await connection.execute(sql, { Name, Email, Password, Phone, Address, UserType }, { autoCommit: true });
  } catch (err) {
    throw new Error("Error adding user: " + err.message);
  } finally {
    await connection.close(); // Close the connection
  }
}

// Get user by ID
async function getUserById(userId) {
  const connection = await getConnection();
  try {
    const result = await connection.execute(
      "SELECT * FROM Users WHERE UserID = :userId", 
      [userId] // Bind the userId parameter
    );
    return result.rows[0]; // Return the user with the specified ID
  } catch (err) {
    throw new Error("Error fetching user by ID: " + err.message);
  } finally {
    await connection.close(); // Close the connection
  }
}

// Update user details
async function updateUser(userId, userDetails) {
  const connection = await getConnection();
  const { Name, Email, Password, Phone, Address, UserType } = userDetails;

  try {
    const sql = `
      UPDATE Users
      SET Name = :Name,
          Email = :Email,
          Password = :Password,
          Phone = :Phone,
          Address = :Address,
          UserType = :UserType
      WHERE UserID = :userId
    `;
    await connection.execute(sql, { Name, Email, Password, Phone, Address, UserType, userId }, { autoCommit: true });
  } catch (err) {
    throw new Error("Error updating user: " + err.message);
  } finally {
    await connection.close(); // Close the connection
  }
}

// Delete a user by ID
async function deleteUser(userId) {
  const connection = await getConnection();
  try {
    const sql = "DELETE FROM Users WHERE UserID = :userId";
    await connection.execute(sql, [userId], { autoCommit: true });
  } catch (err) {
    throw new Error("Error deleting user: " + err.message);
  } finally {
    await connection.close(); // Close the connection
  }
}

module.exports = { getUsers, addUser, getUserById, updateUser, deleteUser };
