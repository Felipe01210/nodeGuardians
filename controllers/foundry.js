const Foundry = require("../models/foundry");
const { validationResult } = require("express-validator");

const getFoundries = async(req, res) => {
    try{
        const foundries = await Foundry.find();
        res.status(200).json(foundries);
    } catch(error) {
        res.status(500).json({message: error})
    }
}

const getFoundryById = async(req, res) => {
    try{
        const foundry = await Foundry.findById(req.params.id)
        res.status(200).json(foundry);
    }catch (error){
        res.status(500).json({message: error});
    }
}

const addFoundry = async (req, res) => {
    const foundry = req.body;
    
    //Validaciones
    //Descripcion predefinida si no se ha introducido una
    if(foundry.description == null){
        foundry.description = `${foundry.location} foundry`;
    }

    const newFoundry = new Foundry(foundry);
    try{
        await newFoundry.save();
        res.status(201).json(newFoundry);
    } catch (error) {
        res.status(500).json({message: error});
    }

}

//Este controlador cubre PUT y PATCH (modificar ruta para validar en cada caso que se den o no todos los campos)
const editFoundry = async (req, res) => {
    const foundry = req.body;

    try{
        await Foundry.findByIdAndUpdate({_id: req.params.id}, foundry);
        res.status(201).json(foundry);
    } catch (error) {
        res.status(404).json({message: 'Foundry not found, try a valid ID'});
    }
}

const deleteFoundry = async (req, res) => {
    const id = req.params.id;
    try{
        let delFoundry = await Foundry.findByIdAndDelete({_id: id})
        res.status(201).json(delFoundry)
    }catch (error) {
        res.status(404).json({message: "Foundry not found, try a valid ID"})
    }
}


module.exports = { getFoundries, getFoundryById, addFoundry, editFoundry, deleteFoundry };