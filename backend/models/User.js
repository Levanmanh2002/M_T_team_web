const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    image: String,
    backgroundImage: String,
    name: String,
    email: String,
    phone: String,
    password: String,
    dateOfBirth: Date,
    sex: Number,
    verified: Boolean
});

const User = mongoose.model('User', UserSchema);

module.exports = User;