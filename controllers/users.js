const User = require("../models/users");
const { validationResult } = require("express-validator");
const crypt = require("bcryptjs");


const addUser = async(req, res) => {
    const {name, password, email, login} = req.body;
    const role = "USER";
    const enable = true;

    const salt = crypt.genSaltSync();

    encodedPassword = crypt.hashSync(password, salt);

    let user;

    try{
        user = await User.findOne({email: email})
        if(user != null){
            res.status(500).json({message: "User already exists"})
        }else{
            try{
                user = await User.findOne({login: login})
                if(user != null){
                    res.status(500).json({message: "User already exists"})
                }else{
                    const newUser = new User({name, password: encodedPassword, email, login, role, enable});
                    try{
                        await newUser.save();
                        res.status(201).json(newUser)
                    }catch(error){
                        res.status(500).json({message: error})
                    }
                }
            }catch{
                res.status(500).json({message: "Service error"})
            }
        }
    }catch{
        res.status(500).json({message: "Service error"})
    }

}

const getUsers = async(req, res) => {
    try{
        const users = await User.find();
        res.status(200).json(users);
    }catch(error){
        res.status(500).json({message: error})
    }
}

const getUserByName = async(req, res) => {
    try{
        const user = await User.findOne({name: req.params.name})
        res.status(200).json(user)
    }catch(error){
        res.status(404).json({message: "User not found"})
    }
}

const editUser = async(req, res) => {
    const user = req.body;
    const id = req.params.id;

    const salt = crypt.genSaltSync();

    encodedPassword = crypt.hashSync(user.password, salt);
    user.password = encodedPassword;

    try{
        await User.findByIdAndUpdate(id, user)
        res.status(201).json(user)
    }catch(error){
        res.status(404).json({message: "User not found"})
    }
}

const deleteUser = async(req, res) => {
    const id = req.params.id;
    try{
        const user = await User.findByIdAndUpdate(id, {enable: false})
        res.status(201).json(user)
    }catch(error){
        res.status(404).json({message: "User not found"})
    }
}

module.exports = { getUsers, getUserByName, addUser, editUser, deleteUser }