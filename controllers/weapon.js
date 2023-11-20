const Weapon = require("../models/weapon");
const { validationResult } = require("express-validator");

const getWeapons = async(req, res) => {
    try{
        const weapons = await Weapon.find();
        res.status(200).json(weapons);
    }catch (error){
        res.status(500).json({message: error});
    }
}

const getWeaponsById = async(req, res) => {
    try{
        const weapon = await Weapon.findById(req.params.id)
        res.status(200).json(weapon)
    }catch (error) {
        res.status(404).json({message: 'Weapon not found, try a valid ID'});
    }
}

const addWeapon = async(req,res) => {
    const weapon = req.body;

    const newWeapon = new Weapon(weapon);
    try{
        await newWeapon.save();
        res.status(201).json(newWeapon);
    }catch (error) {
        res.status(500).json({message: error});
    }
}

const editWeapon = async(req, res) => {
    const weapon = req.body;
    const id = req.params.id;

    try{
        await Weapon.findByIdAndUpdate({_id: id}, weapon);
        res.status(201).json(weapon);
    }catch (error) {
        res.status(404).json({message: 'Weapon not found, try a valid ID'})
    }
}

const deleteWeapon = async(req, res) => {
    const id = req.params.id;
    try{
        let delWeapon = await Weapon.findByIdAndDelete({_id: id})
        res.status(201).json(delWeapon);
    }catch (error) {
        res.status(404).json({message: 'Weapon not found, try a valid ID'});
    }
}

module.exports = { getWeapons, getWeaponsById, addWeapon, editWeapon, deleteWeapon}