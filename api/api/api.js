require("./configuracion/variables");

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
    extended: true
}));
// parse application/json
app.use(bodyParser.json());

app.get('/', function (req, res) {
    res.send('Express On');
});

app.use(require("./rutas/index.rutas"));

//CONECTAR A DB
mongoose.connect("mongodb://localhost/movil", (err) => {
    if (err) {
        console.log(err);
    }
    console.log("Se conecto");
});

app.listen(process.env.PORT, (err)=>{
    console.log("Se conecto por el puerto "+process.env.PORT);
})


