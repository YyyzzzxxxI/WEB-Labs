function deCap(str){
    let  f = str[0]
    str = str.substr(1, str.length)
    return f.toLowerCase() + str
}