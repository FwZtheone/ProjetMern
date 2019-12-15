const User = require('../../schema/schemaUser');
const passwordHash = require("password-hash");



async function signup(req,res){

    const { password, email } = req.body;
    if(!password || !email){
         //le cas où l'email ou le password sont null ou undenfind
         return res.status(400).json({
             text : "Requête invalide"
         })
    }


    //création d'un objet user dans lequel on va has le mdp

    const user = {
        email,
        password : passwordHash.generate(password)
    };

     // on checl en base si l'user existe déjà

     try{
         const findUser = await User.findOne({
             email
         });
         if(findUser)
     }

    
}