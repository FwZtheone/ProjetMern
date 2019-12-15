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
         if(findUser){
             res.status(400).json({
                 text : "émail déjà utilisée"
             })

         }
    

     }
     catch (e){return res.status(500).json({e})}
    try
    {
        //save l'user dans la DB
        const userData = new User(user);
        const userObject = await userData.save();
        return res.status(200).json({
            text :"succès",
            token : userObject.getToken()
        })
    }
    catch(e){res.status(500).json({e})}

    
}



async function(req,res){

    const {password, email } = req.body;
    if(!email ||!password){
        res.status(400).json({
            text: "requête invalide"
        })
    }

    try{

        //on tcheck si l'user existe dans la DB

        const findUser = await User.findOne({email})
        if(!findUser){
            return res.status(400).json({
                text: "l'user n'existe pas"
            })


        }
        if(!findUser.authenticate(password)){
            return res.status(400).json({
                text :"le password est incorrect"
            })
        }
        return res.status(200).json({
            text:"authentification réussie",
            token : findUser.getToken()
        })


    }
    catch(e) {return res.status(500).json({e})}


}