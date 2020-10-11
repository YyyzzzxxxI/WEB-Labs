function logMiddle(req, res, next){
    console.log(req.hostname + req.path)
    next()
}

module.exports.logMiddle = logMiddle