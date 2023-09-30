const sql = require('mysql2')
require('dotenv').config()

var connection = sql.createPool({
	connectionLimit: 40,
	host: process.env.DB_HOST,
	user: process.env.DB_USER,
	database: process.env.DB_NAME,
	password: process.env.DB_PASSWORD,
	connectTimeout: 60000
}).promise()

// const updateConnection = () => {
// 	module.exports.connection = connection = sql.createConnection({
// 		host: process.env.DB_HOST,
// 		user: process.env.DB_USER,
// 		database: process.env.DB_NAME,
// 		password: process.env.DB_PASSWORD,
// 		connectTimeout: 60000
// 	}).promise()
// }

// connection.connect((e) => {
// 	if(e) console.warn(e)
// 	else console.log('Connected to clever-cloud database!')
// })


console.log(connection.on('connection', () => console.log('Connected to clever-cloud database!')))

module.exports.connection = connection
// module.exports.updateConnection = updateConnection























