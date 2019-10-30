const mongoose = require('mongoose');
const { Schema } = mongoose;
const librosSchema = new Schema({
    nombre: { type: String, required: [true, 'nombre requerido'] },
    autor: { type: String, required: [true, 'autor requerido'] },
    ISBN: { type: String, minlength: 13, maxlength: 13, required: [true, 'autor requerido'] },
    fechainscripcion: { type: Date, default: Date.now() },
});
module.exports = mongoose.model('libros', userSchema);