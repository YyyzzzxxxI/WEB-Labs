const lab1 = global.lab1
const tasks = new (require("../tasks").Tasks)()
const router = require('express').Router()


router.get('/', (req, res) => {
    res.render("Index")
})

router.get('/login', (req, res) => {
    res.render("Login")
})


router.get('/register', (req, res) => {
    res.render("Register")
})


router.get(lab1 + 'task4', (req, res) => {
    let answer, error;
    if(req.query.input == null)
        error = `Use ${req.hostname + req.path}?input=some_text`
    else
        answer = tasks.deCap(req.query.input)

    res.render("Task", {
        task: 4, description: "Decap first letter, 4 task", example: ["TTT", "tTT"],
        answer: answer, inRegex: "^[a-zA-Z]+$"
    })
})

router.get('*', function(req, res, next){
    next(new Error("404"))
})


module.exports.router = router