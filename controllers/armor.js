const Armor = require("../models/armor");
const { validationResult } = require("express-validator");

const getArmor = async(req, res) => {
    try{
        const armors = await Armor.find();
        res.status(200).json(armors);
    }catch(error){
        res.status(500).json({message: error})
    }
}

const getArmorById = async(req, res) => {
    const id = req.params.id;
    try{
        const armor = await Armor.findById(id);
        res.status(200).json(armor);
    }catch(error){
        res.status(404).json({message: "Armor not found, try a valid Id"})
    }
}

const addArmor = async(req, res) => {
    const armor = req.body;

    const newArmor = new Armor(armor);
    try{
        await newArmor.save()
        res.status(201),json(newArmor);
    }catch(error){
        res.status(500).json({message: error});
    }
}

const editArmor = async(req, res) => {
    const armor = req.body;
    const id = req.params.id;

    try{
        await Armor.findByIdAndUpdate({_id: id}, armor);
        res.status(201).json(armor);
    }catch(error){
        res.status(500).json({message: "Armor not found, try a valid ID"})
    }
}

const deleteArmor = async(req, res) => {
    const id = req.params.id;
    try{
        let delArmor = await Armor.findByIdAndDelete({_id: id});
        res.status(202).json(delArmor);
    }catch(error){
        res.status(404).json({message: "Armor not found, try a valid ID"});
    }
}

module.exports = { getArmor, getArmorById, addArmor, editArmor, deleteArmor }