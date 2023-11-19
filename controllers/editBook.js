const queryData = require('../conn_query.js')
require('dotenv').config()

module.exports = (req,res) => {
	query_data = [req.body.name,req.body.author, req.body.cur_price,req.body.prev_price,req.body.sales_per,req.body.description,req.body.cover, req.body.tags,req.body.category,req.body.publisher,req.body.release_year,req.body.isbn, req.body.pages,req.body.size,req.body.cover_type,req.body.weight,req.body.age_restrictions, req.body.presented, req.body.id]
	query_data[4] = (req.body.cur_price - req.body.prev_price) / req.body.prev_price * 100

	if(!isFinite(query_data[4]) || query_data[4] == '') {
		query_data[4] = 0
	}
	
	queryData("UPDATE `books` SET `name` = ?, `author` = ?, `cur_price` = ?, `prev_price` = ? , `sales_per` = ?,`description` = ?,`cover` = ?, `tags` = ?, `category` = ?, `publisher` = ? ,`release_year` = ?,`isbn` = ?, `pages` = ?, `size` = ?, `cover_type` = ? ,`weight` = ?,`age_restrictions` = ?, `presented` = ? WHERE `id` = ?", query_data)
		.then(r => {
			res.redirect(process.env.CLIENT_URL  + '/#/book/' + query_data[query_data.length - 1])
		})
}
