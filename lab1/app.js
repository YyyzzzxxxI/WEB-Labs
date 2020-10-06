global.DEBUG = true;
global.lab1 = "/api/SvasyanSpartak/lab1/"

const express = require('express')
const PORT = process.env.PORT || 3000;
const app = express()
app.set("view engine", "pug");

const errMiddle = require("./middleware").errMiddle
const logMiddle = require("./middleware").logModdle
const checkPerm = require("./middleware").checkPerm

app.use(logMiddle)
app.use(lab1 + 'task14', checkPerm);
app.use(lab1 + 'task17', checkPerm);

const routes = require("./routes").Routes(app)

app.use(errMiddle)
app.listen(PORT)