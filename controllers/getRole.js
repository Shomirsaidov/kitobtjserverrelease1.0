const query = require('../conn.js')

const getRole = (req,res) => {
    query("SELECT `username` FROM `clients` WHERE `token` = '" + req.user_token + "'")
        .then(r => {
            console.log(r)
            res.send({role: r})
        })
        .catch(e => {
            console.warn("GO fuck yourself !")
        })
}


module.exports = getRole
