const mongoose = require('mongoose');

const { Schema } = mongoose;

const userSchema = new Schema({
    email: { type: String, unique: true, required: [true, 'email requiered'] },
    contrasena: { type: String, required: [true, 'password requiered'] },
    nombre: { type: String, required: [true, 'firstname requiered'] },
    apellido: { type: String, required: [true, 'surname requiered'] },
    alias: { type: String },
    movil: { type: String, minlength: 9, maxlength: 9 },
    signUpDate: { type: Date, default: Date.now() },
});

module.exports = mongoose.model('User', userSchema);