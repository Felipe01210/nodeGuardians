const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: String,
    email: {type: String, unique: true},
    password: String,
    login: {type: String, unique: true},
    role: String
})

module.exports = mongoose.model('User', UserSchema);