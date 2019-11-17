const bodyParser = require('body-parser');
const express = require('express');
const userRoutes = require('./routes/userRoutes');
const librosRoutes = require('./routes/librosRoutes');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/user', userRoutes);
app.use('/libros', librosRoutes);

module.exports = app;