const oracledb = require('oracledb');
require('dotenv').config();

const pool = oracledb.createPool({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  connectString: process.env.DB_CONNECTION_STRING,
});

module.exports = pool;
