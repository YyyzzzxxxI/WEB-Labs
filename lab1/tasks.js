class Tasks {
    //4
    deCap(str) {
        if (!str) return "Undefined"
        let f = str[0]
        str = str.substr(1, str.length)
        return f.toLowerCase() + str
    }

    //14
    isInt(n) {
        return n == parseInt(n, 10)
    }

    //17
    isObj(tmp) {
        return typeof (tmp) == "object"
    }
}

module.exports.Tasks = Tasks