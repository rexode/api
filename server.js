const mongoose = require('mongoose');
const app = require('./app');
const express = require('express'),
    bodyParser = require('body-parser'),
    jwt = require('jsonwebtoken'),
    config = require('./configs/config'),
    app = express();

app.set('llave', config.llave);

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

app.listen(3000, () => {
    console.log('Servidor iniciado en el puerto 3000')
});

app.get('/', function(req, res) {
    res.send('Inicio');
});

const mongodb = process.env.MONGODB || 'mongodb://localhost:27017/basicAPI';
const port = process.env.PORT || 3000;

mongoose.connect(mongodb, { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
    if (err) console.log(`ERROR: connecting to Database. ${err}`);
    else app.listen(port, console.log(`API started on: http://localhost:${port}`));
});