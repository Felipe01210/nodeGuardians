const User = require("../models/users");
const { validationResult } = require("express-validator");
const crypt = require("bcryptjs");


const addUser = async(req, res) => {
    const {name, password, email, login} = req.body;
    const role = "USER";
    const enable = true;

    const salt = crypt.genSaltSync();

    encodedPassword = crypt.hashSync(password, salt);

    try{
        await User.findOne({email: email})
        res.status(500).json({message: "User already exists"})
    }catch{
        try{
            await User.findOne({login: login})
            res.status(500).json({message: "User already exists"})
        }catch{
            const newUser = new User({name, password: encodedPassword, email, login, role, enable});
            try{
                await newUser.save();
                res.status(201).json(newUser)
            }catch(error){
                res.status(500).json({message: error})
            }
        }
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
    const name = req.params.name;

    try{
        await User.findOneAndUpdate({name: name}, user)
        res.status(201).json(user)
    }catch(error){
        res.status(404).json({message: "User not found"})
    }
}

const deleteUser = async(req, res) => {
    const name = req.params.name;
    try{
        let user = await User.findOneAndUpdate({name: name}, {enable: false})
        res.status(201).json(user)
    }catch(error){
        res.status(404).json({message: "User not found"})
    }
}

module.exports = { getUsers, getUserByName, addUser, editUser, deleteUser }