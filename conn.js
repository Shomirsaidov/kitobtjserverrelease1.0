const mysql = require('mysql2/promise'); // Import mysql2/promise module
// Create a connection pool
require('dotenv').config()

var pool = mysql.createPool({
	host: process.env.DB_HOST,
	user: process.env.DB_USER,
	database: process.env.DB_NAME,
	password: process.env.DB_PASSWORD,
	connectTimeout: 60000
})

// Perform a query
async function performQuery(query) {
  const connection = await pool.getConnection(); // Acquire a connection from the pool
  try {
    const [rows, fields] = await connection.query(query);
    return rows
  } 
  finally {
    connection.release(); // Release the connection back to the pool
  }
}

module.exports = performQuery

