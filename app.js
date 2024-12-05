const express = require("express");
const bodyParser = require("body-parser");
const petsRoutes = require("./routes/petsRoutes"); // Import pet routes
const usersRoutes = require("./routes/usersRoutes"); // Import user routes
const adoptionRequestsRoutes = require("./routes/adoptionRequestsRoutes.js"); // Import adoption request routes
const { initDb } = require("./config/db"); // Import database initialization

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Use the pet routes
app.use("/api", petsRoutes);
// Use the user routes
app.use("/api", usersRoutes);
// Use the adoption request routes
app.use("/api", adoptionRequestsRoutes);

// Start the server
app.listen(PORT, async () => {
  console.log(`Server running on http://localhost:${PORT}`);
  await initDb(); // Initialize the database pool when the server starts
});
