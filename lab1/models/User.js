const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        unique: true,
        minlength: 3,
        maxlength: 20,
        required: true
    },
    password:{
        type: String,
        minlength: 3,
        maxlength: 100,
        required: true
    }
})

const User = mongoose.model('User', userSchema)

function validateUser(username, password){
    let usrLen = username.length
    let pswLen = password.length
    if (!(usrLen >= 3 && usrLen <= 20))
        return "Username must be at least 3 characters"
    if(!(pswLen >= 3 && pswLen <= 100))
        return "Password must be at least 3 characters"
    return null
}

module.exports.User = User
module.exports.validateUser = validateUser