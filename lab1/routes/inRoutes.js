const lab1 = global.lab1
const router = require('express').Router()
const jwt = require('jsonwebtoken')
const passport = require('../passport/passport-config')
const tasks = new (require("../tasks").Tasks)()

router.use([lab1 + 'task14', lab1 + 'task17'], (req, res, next) => {
    passport.authenticate('jwt', {session: false}, (err, user) => {
        if(err || !user)
            next(new Error('401'))
        else next()
    })(req, res, next)
})

router.get(lab1 + 'task14', (req, res, next) => {
    let answer, error;
    if(req.query.input == null)
        error = `Use ${req.hostname + req.path}?input=some_text`
    else
        answer = tasks.isInt(req.query.input)

    res.render("Task", {
        task: 14, description: "Is integer ?!, 14 task", example: ["56", "true"],
        answer: answer, inRegex: "^*$", isAdmin: true
    })
})

router.get(lab1 + 'task17', (req, res, next) => {
    let answer, error
    if(req.query.input == null)
        error = `ERROR: Use ${req.hostname + req.path}?input=some_text`
    else
        answer = tasks.isObj(req.query.input);

    res.render("Task", {
        task: 17, description: "Is object ?!, 17 task",
        answer: answer, inRegex: "^*$", isAdmin: true
    })

})

module.exports.router = router