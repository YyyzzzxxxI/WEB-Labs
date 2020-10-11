const router = require('express').Router()
const config = require("../config/config")
const jwt = require('jsonwebtoken')
const passport = require('../passport/passport-config')

router.use(passport.initialize())

router.post('/login', (req, res) => {
    passport.authenticate('login', {session: false}, async(err, user, info) => {
        if(info)
            res.render('Login', {errMsg: info.message})
        else{
            let token = await jwt.sign(
                user.toObject(),
                config.jwtSecret,
                {expiresIn: config.jwtExpire}
            )
            res.cookie('jwt', token, {httpOnly: true})
            res.redirect('/')
        }
    })(req, res)
})

router.post('/register', (req, res) => {
    passport.authenticate('register', (err, user, info) => {
        if(info)
            res.render('Register', {errMsg: info.message})
        else
            res.redirect('/login')
    })(req, res)
})

module.exports.router = router