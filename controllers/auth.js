const User = require("../models/users");
const { validationResult } = require("express-validator");
const crypt = require("bcryptjs");
const jwt = require("jsonwebtoken")

const authUser = async(req, res) => {

    const {email, login, password} = req.body;

    try{
        const user = await User.findOne({email: email})
        if(!user){
            res.status(400).json({message: "Email error"})
        }
        if(user.login != login){
            res.status(400).json({message: "Login error"})
        }
        if(!crypt.compareSync(password, user.password)){
            res.status(400).json({message: "Password error"})
        }
        if(!user.enable){
            res.status(400).json({message: "Enable error"})
        }else{

            //Generar jwt
            const payload = { uid: user.id };
            const token = jwt.sign(payload, process.env.SECRET, {expiresIn: '1h'})

            res.status(200).json({
                user,
                token
            })
        }
    }catch(error){
        res.status(400).json({message: "User not found"});
    }
}

const renewToken = async(req, res) => {
    const user = req.user;
    const payload = {uid : req.user.uid};
    const token = jwt.sign(payload, process.env.SECRET, {expiresIn: '1h'})

    res.status(200).json({
        message: "Token renovated",
        user,
        token
    })
}

module.exports = { authUser, renewToken }