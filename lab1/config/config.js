require('dotenv').config()

module.exports = {
    jwtSecret: process.env.jwtSecret,
    jwtExpire: 3000,
    dbURI: process.env.dbURI
}