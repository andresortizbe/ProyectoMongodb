const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let userSchema = new Schema({
    name: String,
    lastname: String,
    email: String,
    password: String,
    photo:String
});

const User = mongoose.model('user', userSchema);

module.exports = User;