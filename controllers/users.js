const User = require("../models/users");
const { validationResult } = require("express-validator");

const addUser = async(req, res) => {
    const {name, password, email, login} = req.body;
    const role = "USER";

    const newUser = new User({name, password, email, login, role});
    try{
        await newUser.save();
        res.status(201).json(newUser)
    }catch(error){
        res.status(500).json({message: error})
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
        let user = await User.findOneAndDelete({name: name})
        res.status(201).json(user)
    }catch(error){
        res.status(404).json({message: "User not found"})
    }
}

module.exports = { getUsers, getUserByName, addUser, editUser, deleteUser }