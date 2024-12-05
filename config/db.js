const oracledb = require("oracledb");
require("dotenv").config();

let pool;

async function initDb() {
  try {
    pool = await oracledb.createPool({
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      connectString: process.env.DB_CONNECTION_STRING,
    });
    console.log("Database connected!");
  } catch (err) {
    console.error("Error connecting to the database:", err);
    process.exit(1); // Exit if connection fails
  }
}

async function getConnection() {
  if (!pool) {
    throw new Error("Connection pool is not initialized");
  }
  return await pool.getConnection();
}

module.exports = { initDb, getConnection };
