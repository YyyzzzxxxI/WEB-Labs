//var 17
function isObj(tmp){
    return typeof (tmp) == "object"
}


//var 4
function deCap(str){
    let  f = str[0]
    str = str.substr(1, str.length)
    return f.toLowerCase() + str
}


//var 14
function isInt(n){
    return Number.isInteger(n);
}