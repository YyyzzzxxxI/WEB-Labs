const mongoose = require('mongoose')
const config = require('./config/config')

const URI = config.dbURI

async function initDB(){
    try{
        await mongoose.connect(URI,{
            useNewUrlParser: true,
            useFindAndModify: false,
            useUnifiedTopology: true,            //if you use online mongodb
            useCreateIndex: true
        })
    }
    catch(e){
        console.log(e)
    }
}

function getUserByUsername(username){

}

module.exports.initDB = initDB