//définition des modules

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');


//connexion à la base de donnée
mongoose
    .connect("mongodb://localhost/db")
    .then( () => {
        console.log("connecté à mongodb")
    })
    .catch( (e) => console.log(`erreur de connection à mongoDB , error => ${e} `))


// on définit notre objet express nommé app
const app = express();

//body Parser
const urlencodeParser = bodyParser.urlencoded({
    extended:true
});
app.use(urlencodeParser);
app.use(bodyParser.json());


//définition des CORS

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});


//définition du routeur

const router = express.Router();
app.use("/user", router);
require(__dirname+ "/controllers/userController")(router);


app.get('/hello',(req,res)=>{
    res.json("hello world");
})

const port = 8800;

app.listen(port,() => console.log(`le port est en écoute sur le port : ${port}`));