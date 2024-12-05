const UserModel = require("../models/UserModel"); // Import the User model

// Fetch all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await UserModel.getUsers(); // Call the model function to get users
    res.json(users); // Send the response back with the fetched users
  } catch (err) {
    console.error("Error fetching users:", err);
    res.status(500).send("Error fetching users.");
  }
};

// Add a new user
exports.createUser = async (req, res) => {
  const { Name, Email, Password, Phone, Address, UserType } = req.body;

  try {
    await UserModel.addUser({ Name, Email, Password, Phone, Address, UserType }); // Call model function
    res.status(201).send("User added successfully!"); // Return success response
  } catch (err) {
    console.error("Error adding user:", err);
    res.status(500).send("Error adding user.");
  }
};

// Get a specific user by ID
exports.getUserById = async (req, res) => {
  const userId = req.params.userId;

  try {
    const user = await UserModel.getUserById(userId); // Call model function to get user by ID
    if (!user) {
      return res.status(404).send("User not found.");
    }
    res.json(user); // Return user details
  } catch (err) {
    console.error("Error fetching user by ID:", err);
    res.status(500).send("Error fetching user by ID.");
  }
};

// Update user details by ID
exports.updateUser = async (req, res) => {
  const userId = req.params.userId;
  const { Name, Email, Password, Phone, Address, UserType } = req.body;

  try {
    await UserModel.updateUser(userId, { Name, Email, Password, Phone, Address, UserType }); // Call model function
    res.send("User updated successfully!");
  } catch (err) {
    console.error("Error updating user:", err);
    res.status(500).send("Error updating user.");
  }
};

// Delete a user by ID
exports.deleteUser = async (req, res) => {
  const userId = req.params.userId;

  try {
    await UserModel.deleteUser(userId); // Call model function to delete user
    res.send("User deleted successfully!");
  } catch (err) {
    console.error("Error deleting user:", err);
    res.status(500).send("Error deleting user.");
  }
};
