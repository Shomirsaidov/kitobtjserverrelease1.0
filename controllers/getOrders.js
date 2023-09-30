const query = require('../conn.js')
require('dotenv').config()

module.exports = (req,res) => {
		query("SELECT * FROM `orders` ORDER BY `status` ASC, `id` DESC LIMIT 100") 
			.then(r => {
				res.send(r)
			})
}