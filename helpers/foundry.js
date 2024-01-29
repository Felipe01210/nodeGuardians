const Foundry = require("../models/foundry");

const existFoundry = async (name) => {
    const foundry = await Foundry.findOne({name});

    if(foundry){
        throw new Error(`${name} foundry is already registered`);
    }
}

module.exports = { existFoundry }
