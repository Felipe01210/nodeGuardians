const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FoundrySchema = new Schema({
    name: String,
    location: String,
    description: String
})

module.exports = mongoose.model("Foundry", FoundrySchema);