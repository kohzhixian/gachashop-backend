const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {type: String, required: true, unique: true},
    email: {type: String, required: true},
    password: {type: String, required: true, minlength: 6},
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);