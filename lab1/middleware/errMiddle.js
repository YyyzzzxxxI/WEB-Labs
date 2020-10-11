const fs = require("fs");

function errMiddle(err, req, res, next){
    console.log(err)
    switch (err.message){
        case "401":
            res.render("Error", {errCode: 401, errMsg: "Unauthorized!"});
            break;
        case "403":
            res.render("Error", {errCode: 403, errMsg: "You don't have permission!"});
            break;
        case "404":
            res.render("Error", {errCode: 404, errMsg: "This page doesn't exist!"});
            break;
        default:{
            res.render("Error", {errCode: 500, errMsg: "Internal error. Try later..."})
        }
    }

    fs.readFile('errLog.txt', 'utf8', (err, data) => {
        if (err) fs.writeFileSync("errLog.txt", "")
    });
    fs.appendFile('errLog.txt', err.message + "\n", () => {
    });
}

module.exports.errMiddle = errMiddle
