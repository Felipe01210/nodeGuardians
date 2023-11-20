const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ArmorSchema = new Schema({
    name: String,
    movility: Number,
    resilience: Number,
    recovery: Number,
    totalStats: Number
})

module.exports = mongoose.model("Armor", ArmorSchema);