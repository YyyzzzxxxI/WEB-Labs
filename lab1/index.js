const task4 = require("./task4")
const task14 = require("./task14")
const task17 = require("./task17")

let DEBUG = false

const express = require('express')
const app = express()
const PORT = 3000


const fs = require("fs");
let isAdmin = false;

app.set("view engine", "pug");
app.use(logMiddle)

app.get('/', (req, res) => {
    res.render("Index")
})

app.get('/auth', (req, res) => {
    if(req.query.admin === "true" || isAdmin){
        isAdmin = true
        res.render("Auth", {msg: "Success!"})
        return ;
    }
    res.render("Auth", {msg: "Do auth! You dont know how? Because u r not ADMIN!!! GO AWAY!!!!"})
})

app.get('/api/SvasyanSpartak/lab1/task4',  (req, res) => {
    let answer, error;
    if(req.query.input == null)
        error = `Use ${req.hostname + req.path}?input=some_text`
    else
        answer = task4.deCap(req.query.input)

    res.render("Task", {task: 4, description: "Decap first letter, 4 task", example: ["TTT", "tTT"],
                        answer: answer, inRegex: "^[a-zA-Z]+$"})
})

app.get('/api/SvasyanSpartak/lab1/task14', (req, res, next) => {
    if (!checkPerm()) {
        next(new Error("403"))
        return
    }
    let answer, error;
    if(req.query.input == null)
        error = `Use ${req.hostname + req.path}?input=some_text`
    else
        answer = task14.isInt(req.query.input)

    res.render("Task", {task: 14, description: "Is integer ?!, 14 task", example: ["56", "true"],
        answer: answer, inRegex: "^*$"})
})

app.get('/api/SvasyanSpartak/lab1/task17', (req, res, next) => {
    if (!checkPerm()) {
        next(new Error("403"))
        return
    }
    let answer, error
    if(req.query.input == null)
        error = `ERROR: Use ${req.hostname + req.path}?input=some_text`
    else
        answer = task17.isObj(req.query.input); console.log(answer)

    res.render("Task", {task: 17, description: "Is object ?!, 17 task",
        answer: answer, inRegex: "^*$"})
})

app.get('*', function(req, res, next){
    next(new Error("404"))
});


app.use(errMiddle)
app.listen(PORT)

//////////////////////////////////

function checkPerm(){
    return isAdmin
}

//////////////////MiddleWare///////////////////////////

function errMiddle(err, req, res, next){
    switch (err.message){
        case "403": res.render("Error",{errCode: 403, errMsg: "You don't have permission!"}); break;
        case "404": res.render("Error",{errCode: 404, errMsg: "This page doesn't exist!"}); break;
        default:{
            if(!DEBUG)res.render("Error",{errCode: 500, errMsg: "It's really bad. Left me alone..."})
            else res.send(err); return
        }
    }

    fs.readFile('errLog.txt', 'utf8', (err, data) => {
        if(err) fs.writeFileSync("errLog.txt", "")
    });
    fs.appendFile('errLog.txt', err.message + "\n", () => {});
}

function logMiddle(req, res, next){
    console.log(req.hostname + req.path)
    next()
}

/////////////////////