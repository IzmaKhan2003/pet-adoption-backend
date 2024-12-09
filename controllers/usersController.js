const UserModel = require("../models/UserModel"); // Import the User model

// Fetch all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await UserModel.getUsers(); // Call the model function to get users
    res.status(200).json(users); // Send the response back with the fetched users
  } catch (err) {
    console.error("Error fetching users:", err);
    res.status(500).json({
      message: "Error fetching users.",
      error: err.message,
    });
  }
};

// Add a new user
exports.createUser = async (req, res) => {
  const { Name, Email, Password, Phone, Address, UserType } = req.body;

  try {
    await UserModel.addUser({ Name, Email, Password, Phone, Address, UserType }); // Call model function
    res.status(201).json({
      message: "User added successfully!",
    }); // Return success response
  } catch (err) {
    console.error("Error adding user:", err);
    res.status(500).json({
      message: "Error adding user.",
      error: err.message,
    });
  }
};

// Get a specific user by ID
exports.getUserById = async (req, res) => {
  const userId = req.params.userId;

  try {
    const user = await UserModel.getUserById(userId); // Call model function to get user by ID
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }
    res.status(200).json(user); // Return user details
  } catch (err) {
    console.error("Error fetching user by ID:", err);
    res.status(500).json({
      message: "Error fetching user by ID.",
      error: err.message,
    });
  }
};

// Get a specific user by email
exports.getUserByEmail = async (req, res) => {
    const email = req.params.email;
  
    try {
      const user = await UserModel.getUserByEmail(email); // Call the correct model function
      if (!user) {
        return res.status(404).json({ message: "User not found." });
      }
      res.status(200).json(user); // Return user details
    } catch (err) {
      console.error("Error fetching user by email:", err);
      res.status(500).json({
        message: "Error fetching user by email.",
        error: err.message,
      });
    }
  };

// Update user details by ID
exports.updateUser = async (req, res) => {
  const userId = req.params.userId;
  const { Name, Email, Password, Phone, Address, UserType } = req.body;

  try {
    await UserModel.updateUser(userId, { Name, Email, Password, Phone, Address, UserType }); // Call model function
    res.status(200).json({ message: "User updated successfully!" });
  } catch (err) {
    console.error("Error updating user:", err);
    res.status(500).json({
      message: "Error updating user.",
      error: err.message,
    });
  }
};

// Delete a user by ID
exports.deleteUser = async (req, res) => {
  const userId = req.params.userId;

  try {
    await UserModel.deleteUser(userId); // Call model function to delete user
    res.status(200).json({ message: "User deleted successfully!" });
  } catch (err) {
    console.error("Error deleting user:", err);
    res.status(500).json({
      message: "Error deleting user.",
      error: err.message,
    });
  }
};
