const queryData = require('../conn_query.js')
require('dotenv').config()

module.exports = (req,res) => {
	const data = [req.body.status, req.body.denyCause, req.body.deliveryDate, req.body.orderId]

	queryData("UPDATE `orders` SET `status` = ?, `notes` = ?, `delivery_date` = ?  WHERE `id` = ?", data)
		.then(r => {
			res.send(r)
		})
		
}