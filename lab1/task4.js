function deCap(str){
    if(!str) return "<b><em>Undefined</em></b>"
    let  f = str[0]
    str = str.substr(1, str.length)
    return f.toLowerCase() + str
}

module.exports.deCap = deCap