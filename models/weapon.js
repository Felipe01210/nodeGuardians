const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const WeaponSchema = new Schema({
    name: String,
    slot: String,
    season: Number,
    firstPerk: String,
    secondPerk: String,
    foundryPerk: String,
    sunset: Boolean
})

module.exports = mongoose.model('Weapon', WeaponSchema);