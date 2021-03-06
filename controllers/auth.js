const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const loginCtrl = async (req, res) => {
    const {email, password} = req.body;
    try{
        let user = await User.find({email: email});
        if(user){

            let token = jwt.sign({name: user.name, lastname: user.lastname, email: user.email}, 'AcademloSecret');
            // let refreshToken = jwt.sign({name: user.name, lastname: user.lastname, email: user.email}, 'AcademloSecret');
            // let jwtTokenExpiry = Math.floor(Date.now() / 1000) + (60 * 60);
            let response = await bcrypt.compare(password, user[0].password);            
            if(response){
                
                res.cookie('tkn', token, {httpOnly: true});
                return res.status(200).json({
                    message: "Las credenciales son correctas",
                    results: user.length > 0 ? user[0] : null
                });
            }
            return res.status(401).json({
                message: "Email o contraseña incorrectas"
            });
        }else{
            return res.status(401).json({
                message: "Email o contraseña incorrectas"
            });
        }        
    }catch(error){
        return res.status(401).json({
            message: "Email o contraseña incorrectos"
        });
    }
}

const registerCtrl = async (req, res) => {
    let {name, lastname, email, password} = req.body;    

    //Verificar que el usuario no se encuentre registrado
    let users = await User.find({email: email});
    if(users.length > 0){
        return res.status(400).json({
            message: "El usuario ya está registrado en el sistema"
        });
    }else{
        try{
            password = await bcrypt.hash(password, 10); //Encriptando la contraseña
            let user = new User({name, lastname, email, password}); 
            await user.save(); //Guardando al usuario
            res.status(201).json({
                message: "El usuario ha sido registrado correctamente"
            });
        }catch(error){
            console.log(error);
            res.status(400).json({
                message: "Hubo un error al tratar de registrar un usuario"
            });
        }
    }
}



module.exports = {
    loginCtrl,
    registerCtrl
}