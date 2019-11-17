const mongoose = require('mongoose');
const { Schema } = mongoose;
const librosSchema = new Schema({
    titulo: { type: String, required: [true, 'nombre requerido'] },
    autor: { type: String, required: [true, 'autor requerido'] },
    ISBN: { type: String, minlength: 13, maxlength: 13, required: [true, 'ISBN   requerido'], unique: true },
    fechapublicacion: { type: Date, required: [true, 'fecha de publicacion requerida'] },
    descripcion: { type: String, maxlength: 256, required: [true, 'descripcion requerida'] },
    precio: { type: Number, required: [true, 'precio requerido'] },
    editorial: { type: String, required: [true, 'editorial requerida'] }
});
module.exports = mongoose.model('libros', librosSchema);