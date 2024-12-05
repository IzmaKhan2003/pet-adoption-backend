const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const UserModel = require("../models/UserModel");

// Register a new user
exports.registerUser = async (req, res) => {
  const { Name, Email, Password, Phone, Address, UserType } = req.body;

  try {
    // Validate required fields
    if (!Name || !Email || !Password || !UserType) {
      return res.status(400).send("All fields are required.");
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(Password, 10); // 10 is the salt rounds

    // Save the user in the database
    await UserModel.addUser({
      Name,
      Email,
      Password: hashedPassword,
      Phone,
      Address,
      UserType,
    });

    res.status(201).send("User registered successfully!");
  } catch (err) {
    console.error("Error registering user:", err);
    res.status(500).send("Error registering user.");
  }
};

// Login user
exports.loginUser = async (req, res) => {
    const { Email, Password } = req.body;
  
    try {
      if (!Email || !Password) {
        return res.status(400).send("Email and Password are required.");
      }
  
      // Find the user by email
      const user = await UserModel.getUserByEmail(Email);
      console.log("User fetched from DB:", user);
  
      if (!user) {
        return res.status(404).send("User not found.");
      }
  
      // Log the plain password and the hashed password
      console.log("Plain Password:", Password);
      console.log("Hashed Password from DB:", user.Password);
  
      // Compare the passwords using bcrypt
      const isPasswordValid = await bcrypt.compare(Password, user.Password);
      if (!isPasswordValid) {
        return res.status(401).send("Invalid credentials.");
      }
  
      // Generate JWT token
      const token = jwt.sign(
        { userId: user.UserID, userType: user.UserType },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );
  
      res.json({ message: "Login successful!", token });
    } catch (err) {
      console.error("Error logging in:", err);
      res.status(500).send("Error logging in.");
    }
  };
  