const express = require("express");
const bodyParser = require("body-parser");

const petsRoutes = require("./routes/petsRoutes"); // Import pet routes
const usersRoutes = require("./routes/usersRoutes"); // Import user routes
const adoptionRequestsRoutes = require("./routes/adoptionRequestsRoutes.js"); // Import adoption request routes
const healthRecordRoutes = require("./routes/healthRecordRoutes.js"); // Import adoption request routes
const followUpCheckRoutes = require("./routes/followUpCheckRoutes.js"); // Import the routes for follow-up checks
const adminRoutes = require("./routes/adminRoutes.js"); // Import admin routes
const authRoutes = require("./routes/authRoutes"); // Import authentication routes
const { getConnection , initDb} = require("./config/db"); // Import the connection pool
//const { initDb } = require("./config/db"); // Import database initialization
const { getUserByEmail } = require('./models/UserModel');
const { sendAdoptionApprovalEmail } = require("./utils/emailUtils");

const app = express();
const PORT = process.env.PORT || 5000;



// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const cors = require("cors");

app.use(cors());

// Use the pet routes
app.use("/api", petsRoutes);
// // Use the user routes
// app.use("/api", usersRoutes);
// // Use the adoption request routes
// app.use("/api", adoptionRequestsRoutes);
//Use the health record routes
app.use("/api", healthRecordRoutes);
// // Use the follow-up check routes
// app.use("/api", followUpCheckRoutes);
// // Use the admin routes
// app.use("/api", adminRoutes);
// Use authentication routes
app.use("/api/auth", authRoutes);

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
  
  // Controller-like logic in the route directly
  app.post("/api/adoption-requests", async (req, res) => {
    const { email, petId, comments } = req.body;
  
    try {
      // Call the model function to add adoption request
      await addAdoptionRequest({ email, petId, comments });
  
      res.status(201).json({ message: "Adoption request added successfully!" });
    } catch (err) {
      console.error("Error adding adoption request:", err.message);
      res.status(500).json({
        message: "Error adding adoption request.",
        error: err.message,
      });
    }
  });

  //get-all-adoption-requests
app.get("/api/adoption-requests", async (req, res) => {
    try {
      const connection = await getConnection(); // Get a connection from the pool
      const result = await connection.execute("SELECT * FROM AdoptionRequest"); // Execute the query
      await connection.close(); // Close the connection
      
      res.json(result.rows); // Send the fetched rows as JSON response
    } catch (err) {
      console.error("Error fetching adoption requests:", err); // Log the error
      res.status(500).json({ message: "Error fetching adoption requests" }); // Send error response
    }
  });

  //create adoption request
//   app.put(
//     "/api/adoption-request/:requestId",
//     async (req, res) => {
//       const { requestId } = req.params;
//       const { status } = req.body;
  
//       console.log("Request ID received:", requestId);
//       console.log("Status to update:", status);
  
//       if (!status) {
//         return res.status(400).json({ message: "Status is required" });
//       }
  
//       try {
//         const connection = await getConnection();
  
//         // Debug the connection
//         console.log("Database connection established");
  
//         const sql = `
//           UPDATE AdoptionRequest
//           SET Status = :status
//           WHERE REQUESTID = :requestId`;
//         const binds = { status, requestId };
  
//         console.log("Executing SQL:", sql);
//         console.log("With binds:", binds);
  
//         const result = await connection.execute(`UPDATE AdoptionRequest
//           SET Status = :status
//           WHERE REQUESTID = :requestId`, binds, { autoCommit: true });

//                    // If the status is "Approved", send the email
//     if (status === "Approved") {
//         await sendAdoptionApprovalEmail(userEmail, petName);
//       }
  
//         // Debug the SQL execution result
//         console.log("SQL Execution Result:", result);
  
//         await connection.close();
  
//         if (result.rowsAffected === 0) {
//           return res.status(404).json({ message: "Adoption request not found" });
//         }

//         res.status(200).json({
//           message: `Adoption request ${requestId} updated to status '${status}'`,
//         });
//       } catch (err) {
//         console.error("Error updating adoption request:", err.message);
//         res.status(500).json({ message: "Error updating adoption request" });
//       }
//     }
//   );
app.put("/api/adoption-request/:requestId", async (req, res) => {
    const { requestId } = req.params;
    const { status } = req.body;
  
    console.log("Request ID received:", requestId);
    console.log("Status to update:", status);
  
    if (!status) {
      return res.status(400).json({ message: "Status is required" });
    }
  
    try {
      const connection = await getConnection();
  
      console.log("Database connection established");
  
      // SQL to get user email and pet name along with updating the status
      const sql = `
        SELECT u.Email AS userEmail, p.PetName AS petName
        FROM AdoptionRequest ar
        JOIN Users u ON ar.UserID = u.UserID
        JOIN Pet p ON ar.PetID = p.PetID
        WHERE ar.REQUESTID = :requestId`;
  
      const binds = { requestId };
  
      console.log("Executing SQL:", sql);
      console.log("With binds:", binds);
  
      // Execute SQL to retrieve user email and pet name
      const result = await connection.execute(sql, binds);
  
      // Check if the result is empty
      if (result.rows.length === 0) {
        return res.status(404).json({ message: "Adoption request not found" });
      }
  
      // Log the raw result to check its structure
      console.log("Raw Result:", result.rows);
  
      // If rows are arrays, destructure values from the first row
      const userEmail = result.rows[0][0];  // Assuming email is in the first column
      const petName = result.rows[0][1];    // Assuming pet name is in the second column
  
      // Log the email and petName correctly
      console.log("Email:", userEmail);
      console.log("Pet Name:", petName);
  
      // Update the status of the adoption request
      const updateSql = `
        UPDATE AdoptionRequest
        SET Status = :status
        WHERE REQUESTID = :requestId`;
  
      await connection.execute(updateSql, { status, requestId }, { autoCommit: true });
  
      // If the status is "Approved", send the email
      if (status === "Approved") {
        await sendAdoptionApprovalEmail(userEmail, petName);
      }
  
      console.log("SQL Execution Result:", result);
  
      await connection.close();
  
      res.status(200).json({
        message: `Adoption request ${requestId} updated to status '${status}'`,
      });
    } catch (err) {
      console.error("Error updating adoption request:", err.message);
      res.status(500).json({ message: "Error updating adoption request" });
    }
  });
  
  
  

  //Retrieve all Users
app.get('/api/users', async (req, res) => {
    try {
      const connection = await getConnection(); // Get a connection from the pool
      const query = 'SELECT * FROM Users'; // Adjust table name or schema if needed
      const result = await connection.execute(query); // Execute the query
  
      await connection.close(); // Close the connection
  
      if (!result.rows || result.rows.length === 0) {
        // No users found
        return res.status(404).json({ message: 'No users found in the database.' });
      }
  
      // Send the fetched rows as JSON response
      res.status(200).json(result.rows);
    } catch (err) {
      console.error('Error fetching users:', err.message); // Log detailed error
      res.status(500).json({ message: 'Internal server error while fetching users.' });
    }
  });
  
  
//create user
app.post("/api/users", async (req, res) => {
    const userDetails = req.body;
    const { Name, Email, Password, Phone, Address, UserType } = userDetails;
  
    if (!Name || !Email || !Password || !Phone || !Address || !UserType) {
      return res.status(400).json({ message: "All fields are required." });
    }
  
    let connection;
    try {
      // Get database connection
      connection = await getConnection();
  
      // SQL query
      // const sql = `
      //   INSERT INTO Users (Name, Email, Password, Phone, Address, UserType)
      //   VALUES (:Name, :Email, :Password, :Phone, :Address, :UserType)
      // `;
  
      // Execute query
      await connection.execute(
        `
        INSERT INTO Users (Name, Email, Password, Phone, Address, UserType)
        VALUES (:Name, :Email, :Password, :Phone, :Address, :UserType)
      `,
        { Name, Email, Password, Phone, Address, UserType },
        { autoCommit: true }
      );
  
      res.status(201).json({ message: "User added successfully." });
    } catch (err) {
      console.error("Error adding user:", err.message);
      res.status(500).json({ message: "Error adding user: " + err.message });
    } finally {
      if (connection) {
        await connection.close(); // Close the database connection
      }
    }
  });
  

// Start the server
app.listen(PORT, async () => {
  console.log(`Server running on http://localhost:${PORT}`);
  await initDb(); // Initialize the database pool when the server starts
});
