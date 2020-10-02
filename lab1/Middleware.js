const fs = require("fs");

function checkPerm(req, res, next){
    if(req.query.admin === "true"){
        next()
    }
    else next(new Error(403))
}

function errMiddle(err, req, res, next){
    switch (err.message){
        case "403": res.render("Error",{errCode: 403, errMsg: "You don't have permission!"}); break;
        case "404": res.render("Error",{errCode: 404, errMsg: "This page doesn't exist!"}); break;
        default:{
            if(global.DEBUG) res.send(err.message)
            else res.render("Error",{errCode: 500, errMsg: "It's really bad. Left me alone..."})
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

module.exports.errMiddle = errMiddle
module.exports.checkPerm = checkPerm
module.exports.logModdle = logMiddle