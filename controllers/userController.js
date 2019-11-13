const User = require('../models/usuarios');
const bcrypt = require('bcrypt');
const rondascifrado = 8;
const app = require('./app');
const express = require('express'),
    bodyParser = require('body-parser'),
    jwt = require('jsonwebtoken'),
    config = require('./middleware/middleware'),
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




function getUsers(req, res) {
    User.find({}, (error, users) => {
        if (error) return res.status(500).send({ error });

        return res.status(200).send(users);
    });
}

function getUser(req, res) {
    const { userId } = req.params;

    // Finds the user with the id provided
    User.findById(userId, (error, user) => {
        if (error) return res.status(404).send({ message: 'No users found', error });

        return res.status(200).send(user);
    });
}

// Create and save a new user
function createUser(req, res) {
    // Create a new user
    const user = new User(req.body);

    // Save the new user
    user.save((error, newUser) => {
        if (error) return res.status(400).send({ message: 'Error saving user', error });

        return res.status(200).send({ message: 'Saved user', newUser });
    });
}

// Replace the user information
function replaceUser(req, res) {
    const { userId } = req.params;
    const { email } = req.body;
    const { contraseña } = req.body;
    const { nombre } = req.body;
    const { apellido } = req.body;
    const { alias } = req.body;
    bcrypt.genSalt(rondascifrado, function(err, salt) {
        bcrypt.hash(contraseña, salt, function(err, hash) {});
    });

    if (!email || !nombre || !apellido || !contraseña || !alias) {
        return res.status(400).send({ message: 'Missing params' });
    }

    // Create the new user
    const userReplacement = req.body;

    User.findById(userId, (err, user) => {
        if (err) return res.status(404).send({ message: 'No user to replace found', err });

        // Replaces the user
        user.replaceOne(userReplacement, (error) => {
            if (error) return res.status(500).send({ error });

            return res.status(200).send({ message: 'User replaced' });
        });
    });
}

// Update the user information
function editUser(req, res) {
    const { userId } = req.params;

    // Update the user
    User.findByIdAndUpdate(userId, req.body, { new: true }, (error, user) => {
        if (error) return res.status(500).send({ error });

        return res.status(200).send({ message: 'User updated', user });
    });
}

// Deletes the user from the database
function deleteUser(req, res) {
    const { userId } = req.params;

    User.findByIdAndRemove(userId, (err, user) => {
        if (err) return res.status(500).send({ err });
        if (!user) return res.status(404).send({ message: 'User not found' });

        return res.status(200).send({ message: 'User deleted', user });
    });
}

// Validate the information to log in
function login(req, res) {
    const { email } = req.params;
    const { contraseña } = req.body;

    bcrypt.genSalt(rondascifrado, function(err, salt) {
        bcrypt.hash(contraseña, salt, function(err, hash) {});
    });
    User.findOne({ email }, (err, user) => {
        if (err) return res.status(500).send({ err });
        if (!user) return res.status(404).send({ message: 'No user found' });

        if (contraseña !== user.contraseña) return res.status(401).send({ message: 'Incorrect password' });

        return res.status(200).send({ message: 'Correct password' });
    });
    app.post('/autenticar', (req, res) => {
        if (contraseña === user.contraseña && email === user.email) {
            const payload = {
                check: true
            };
            const token = jwt.sign(payload, app.get('llave'), {
                expiresIn: 1440
            });
            res.json({
                mensaje: 'Autenticación correcta',
                token: token
            });
        } else {
            res.json({ mensaje: "Usuario o contraseña incorrectos" })
        }
    })
}
const rutasProtegidas = express.Router();
rutasProtegidas.use((req, res, next) => {
    const token = req.headers['access-token'];

    if (token) {
        jwt.verify(token, app.get('llave'), (err, decoded) => {
            if (err) {
                return res.json({ mensaje: 'Token inválida' });
            } else {
                req.decoded = decoded;
                next();
            }
        });
    } else {
        res.send({
            mensaje: 'Token no proveída.'
        });
    }
});


module.exports = {
    getUser,
    getUsers,
    createUser,
    replaceUser,
    editUser,
    deleteUser,
    login,
};