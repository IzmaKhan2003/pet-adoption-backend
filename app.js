const express = require("express");
const bodyParser = require("body-parser");
const petsRoutes = require("./routes/petsRoutes"); // Import pet routes
const { initDb } = require("./config/db"); // Import database initialization

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Use the pet routes
app.use("/api", petsRoutes);

// Start the server
app.listen(PORT, async () => {
  console.log(`Server running on http://localhost:${PORT}`);
  await initDb(); // Initialize the database pool when the server starts
});
