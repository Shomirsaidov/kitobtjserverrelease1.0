const sql = require('mysql2')
require('dotenv').config()

var connection = sql.createPool({
	connectionLimit: 40,
	host: process.env.DB_HOST,
	user: process.env.DB_USER,
	database: process.env.DB_NAME,
	password: process.env.DB_PASSWORD,
	connectTimeout: 60000
})

console.log(connection.on('connection', () => console.log('Connected to clever-cloud database!')))
module.exports.connection = connection























