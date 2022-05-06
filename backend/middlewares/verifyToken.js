const jwt = require("jsonwebtoken")

require("dotenv").config();
const veryfyToken = (req, res, next) => {
    const token = req.headers["auth-token"]
    if (!token) return res.status(401).send("Access denied")

    const payload = jwt.verify(token, process.env.SECRET_TOKEN, (error, payload) => {
        if (error) {
            res.status(403).send("access denied")
        } else {
            req.userId = payload._id
            next()
        }
    })
}
module.exports = {
    veryfyToken
}