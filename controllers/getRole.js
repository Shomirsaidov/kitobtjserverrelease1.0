const query = require('../conn.js')

const getRole = (req,res) => {
    query("SELECT `username` FROM `clients` WHERE `token` = '" + req.user_token + "'")
        .then(r => {
            console.log("SELECT `username` FROM `clients` WHERE `token` = '" + req.body.user_token + "'")
            console.log(r)
            res.send({role: r[0].username})
        })
        .catch(e => {
            console.warn("GO fuck yourself !")
        })
}


module.exports = getRole
