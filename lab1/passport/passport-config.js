const bcrypt = require('bcrypt')
const config = require("../config/config")
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const User = require('../models/User').User
const validateUser = require('../models/User').validateUser


//done(serverError, user, msg)
async function loginUser(username, password, done){
    const user = await User.findOne({username: username})
    if(!user)
        return done(null, false, {message: 'Incorrect username!'})
    try{
        if(await bcrypt.compare(password, user.password)){
            console.log("Logged in:\n" + user)
            return done(null, user)
        }
        else
            return done(null, false, {message: "Incorrect password!"})
    }
    catch(e){
        return done(e)
    }
}

async function registerUser(username, password, done){
    const user = await User.findOne({username: username})
    if(user)
        return done(null, false, {message: 'Username already exist!'})
    try{
        let validateMsg = validateUser(username, password)
        console.log(validateMsg)
        if(validateMsg){
            return done(null, false, {message: validateMsg})
        }
        const hashedPassword = await bcrypt.hash(password, 10)
        let user = new User({
            username: username,
            password: hashedPassword
        })
        await user.save()
                  .then((user) => {
                      console.log('Registered:\n' + user)
                      return done(null, user, {message: "Success register!"})
                  })
                  .catch(e => {
                      return done(e)
                  })
    }
    catch(e){
        return done(e)
    }
}

const jwtOptions = {
    secretOrKey: config.jwtSecret,
    jwtFromRequest: function(req){
        let token = null;
        if(req && req.cookies) token = req.cookies['jwt'];
        return token;
    }
}

async function jwtFunc(payload, done){
    await User.findOne({username: payload.username}, (err, user) => {
        if(err)
            return done(err)
        if(user)
            return done(null, user)
        else
            return done(null, false)
    })
}

passport.use('jwt', new JwtStrategy(jwtOptions, jwtFunc));

passport.use('login', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password'
}, loginUser))

passport.use('register', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password'
}, registerUser))

module.exports = passport