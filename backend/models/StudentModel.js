const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const bcrypt = require("bcrypt");

var UsersSchema = new mongoose.Schema({
    name: { type: String},
    email: { type: String, unique: true },
    phone: { type: String},
    password: { type: String},
    class: { type: String},
    division: { type: String},
    rollno: {type: Number},
    joined_date: { type: Date, default: Date.now }
}, { collection: 'users' });

UsersSchema.methods.generatePassword = function (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
}

UsersSchema.methods.validatePassword = function (password) {
    return bcrypt.compareSync(password, this.password);
}

UsersSchema.plugin(uniqueValidator);

mongoose.model('Users', UsersSchema);