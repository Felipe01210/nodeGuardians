const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: {type: String, require: true},
    email: {type: String, unique: true, require: true},
    password: {type: String, require: true},
    login: {type: String, unique: true, require: true},
    role: String,
    enable: Boolean
})

//Metodo para modificar lo que devuelve user al darlo por JSON
UserSchema.methods.toJSON = function(){
    const {__v, password, _id, ...user} = this.toObject();
    user.uid = _id;
    return user;
}

module.exports = mongoose.model('User', UserSchema);