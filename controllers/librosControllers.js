const libro = require('../models/libros');

function createUser(req, res) {
    const libro = new User(req.body);

    libro.save((error, newUser) => {
        if (error) return res.status(400).send({ message: 'Error saving book', error });

        return res.status(200).send({ message: 'book Saved', newUser });
    });
}

function getUsers(req, res) {
    libro.find({}, (error, users) => {
        if (error) return res.status(500).send({ error });

        return res.status(200).send(users);
    });
}

function getUser(req, res) {
    const { userId } = req.params;

    libro.findById(userId, (error, user) => {
        if (error) return res.status(404).send({ message: 'No books found', error });

        return res.status(200).send(user);
    });
}

function replaceUser(req, res) {
    const { userId } = req.params;
    const { nombre } = req.body;
    const { autor } = req.body;
    const { ISBN } = req.body;
    if (!nombre || !autor || !ISBN) {
        return res.status(400).send({ message: 'Missing params' });
    }

    const userReplacement = req.body;

    libro.findById(userId, (err, user) => {
        if (err) return res.status(404).send({ message: 'No book to replace found', err });

        libro.replaceOne(userReplacement, (error) => {
            if (error) return res.status(500).send({ error });

            return res.status(200).send({ message: 'book replaced' });
        });
    });
}

function deleteUser(req, res) {
    const { userId } = req.params;

    libro.findByIdAndRemove(userId, (err, user) => {
        if (err) return res.status(500).send({ err });
        if (!user) return res.status(404).send({ message: 'book not found' });

        return res.status(200).send({ message: 'book deleted', user });
    });
}

function editUser(req, res) {
    const { userId } = req.params;

    libro.findByIdAndUpdate(userId, req.body, { new: true }, (error, user) => {
        if (error) return res.status(500).send({ error });

        return res.status(200).send({ message: 'book updated', user });
    });
}