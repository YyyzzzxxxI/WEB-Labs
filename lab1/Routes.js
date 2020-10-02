const lab1 = global.lab1
const tasks = new (require("./Tasks").Tasks)()

function Routes(app){
    app.get('/', (req, res) => {
        res.render("Index")
    })

    app.get('/auth', (req, res) => {
        if(req.query.admin === "true"){
            res.render("Auth", {msg: "Success!"})
            return ;
        }
        res.render("Auth", {msg: "Do auth! You dont know how? Because u r not ADMIN!!! GO AWAY!!!!"})
    })

    app.get(lab1 + 'task4',  (req, res) => {
        let answer, error;
        if(req.query.input == null)
            error = `Use ${req.hostname + req.path}?input=some_text`
        else
            answer = tasks.deCap(req.query.input)



        res.render("Task", {task: 4, description: "Decap first letter, 4 task", example: ["TTT", "tTT"],
            answer: answer, inRegex: "^[a-zA-Z]+$"})
    })


    app.get(lab1 + 'task14', (req, res, next) => {
        let answer, error;
        if(req.query.input == null)
            error = `Use ${req.hostname + req.path}?input=some_text`
        else
            answer = tasks.isInt(req.query.input)

        res.render("Task", {task: 14, description: "Is integer ?!, 14 task", example: ["56", "true"],
            answer: answer, inRegex: "^*$", isAdmin: true})
    })


    app.get(lab1 + 'task17', (req, res, next) => {
        let answer, error
        if(req.query.input == null)
            error = `ERROR: Use ${req.hostname + req.path}?input=some_text`
        else
            answer = tasks.isObj(req.query.input); console.log(answer)

        res.render("Task", {task: 17, description: "Is object ?!, 17 task",
            answer: answer, inRegex: "^*$", isAdmin: true})

    })

    app.get('*', function(req, res, next){
        next(new Error("404"))
    });
}

module.exports.Routes = Routes