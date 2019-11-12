const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const rondascifrado = 8;


const { Schema } = mongoose;

const userSchema = new Schema({
    email: { type: String, unique: true, required: [true, 'email requerida'] },
    contraseña: { type: String, required: [true, 'contraseña requerida'] },
    nombre: { type: String, required: [true, 'nombre requerida'] },
    apellido: { type: String, required: [true, 'apellido requerida'] },
    alias: { type: String, unique: true },
    movil: { type: String, minlength: 9, maxlength: 9 },
    fechacreacion: { type: Date, default: Date.now() },
});
bcrypt.genSalt(rondascifrado, function(err, salt) {
    bcrypt.hash(contraseña, salt, function(err, hash) {});
});

module.exports = mongoose.model('User', userSchema);