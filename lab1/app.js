global.DEBUG = false;
global.lab1 = "/api/SvasyanSpartak/lab1/"

const express = require('express')
const PORT = process.env.PORT || 3000;
const app = express()
app.set("view engine", "pug");

const db = require('./db')
const cookieParser = require('cookie-parser')
const routes = require('./routes/routes').router
const signRoutes = require('./routes/signRoutes').router
const inRoutes = require('./routes/inRoutes').router
const errMiddle = require("./middleware/errMiddle").errMiddle
const logMiddle = require("./middleware/logMiddle").logMiddle
db.initDB()

app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(cookieParser())
app.use(logMiddle)
app.use(signRoutes)
app.use(inRoutes)
app.use(routes)
app.use(errMiddle)

app.listen(PORT)