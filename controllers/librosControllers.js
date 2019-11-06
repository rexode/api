const Libro = require('../models/libros');

function createLibro(req, res) {
    const libro = new Libro(req.body);

    libro.save((error, newLibro) => {
        if (error) return res.status(400).send({ message: 'Error saving book', error });

        return res.status(200).send({ message: 'book Saved', newLibro });
    });
}

function getLibros(req, res) {
    Libro.find({}, (error, libros) => {
        if (error) return res.status(500).send({ error });

        return res.status(200).send(libros);
    });
}

function getLibro(req, res) {
    const { bookId } = req.params;

    Libro.findById(bookId, (error, libro) => {
        if (error) return res.status(404).send({ message: 'No books found', error });

        return res.status(200).send(libro);
    });
}

function getLibroTitulo(req, res) {
    const { titulo } = req.params;

    Libro.findOne(titulo, (error, libro) => {
        if (error) return res.status(404).send({ message: 'No books found', error });

        return res.status(200).send(libro);
    });
}

function getLibroAutor(req, res) {
    const { autor } = req.params;

    Libro.findOne(autor, (error, libro) => {
        if (error) return res.status(404).send({ message: 'No books found', error });

        return res.status(200).send(libro);
    });
}

function getLibroISBN(req, res) {
    const { ISBN } = req.params;

    Libro.findOne(ISBN, (error, libro) => {
        if (error) return res.status(404).send({ message: 'No books found', error });

        return res.status(200).send(libro);
    });
}

function getLibroFecha(req, res) {
    const { fechapublicacion } = req.params;

    Libro.findOne(fechapublicacion, (error, libro) => {
        if (error) return res.status(404).send({ message: 'No books found', error });

        return res.status(200).send(libro);
    });
}

function getLibroDescripcion(req, res) {
    const { descripcion } = req.params;

    Libro.findOne(descripcion, (error, libro) => {
        if (error) return res.status(404).send({ message: 'No books found', error });

        return res.status(200).send(libro);
    });
}

function getLibroPrecio(req, res) {
    const { precio } = req.params;

    Libro.findOne(precio, (error, libro) => {
        if (error) return res.status(404).send({ message: 'No books found', error });

        return res.status(200).send(libro);
    });
}

function getLibroEditorial(req, res) {
    const { editorial } = req.params;

    Libro.findOne(editorial, (error, libro) => {
        if (error) return res.status(404).send({ message: 'No books found', error });

        return res.status(200).send(libro);
    });
}


function replaceLibro(req, res) {
    const { bookId } = req.params;
    const { nombre } = req.body;
    const { autor } = req.body;
    const { ISBN } = req.body;
    const { fechapublicacion } = req.body;
    const { descripcion } = req.body;
    const { precio } = req.body;
    const { editorial } = req.body;
    if (!nombre || !autor || !ISBN || !fechapublicacion || !descripcion || !precio || !editorial) {
        return res.status(400).send({ message: 'Missing params' });
    }

    const bookReplacement = req.body;

    Libro.findById(bookId, (err, libro) => {
        if (err) return res.status(404).send({ message: 'No book to replace found', err });

        libro.replaceOne(bookReplacement, (error) => {
            if (error) return res.status(500).send({ error });

            return res.status(200).send({ message: 'book replaced' });
        });
    });
}

function deleteLibro(req, res) {
    const { bookId } = req.params;

    Libro.findByIdAndRemove(bookId, (err, libro) => {
        if (err) return res.status(500).send({ err });
        if (!libro) return res.status(404).send({ message: 'book not found' });

        return res.status(200).send({ message: 'book deleted', libro });
    });
}

function editLibro(req, res) {
    const { bookId } = req.params;

    Libro.findByIdAndUpdate(bookId, req.body, { new: true }, (error, libro) => {
        if (error) return res.status(500).send({ error });

        return res.status(200).send({ message: 'book updated', libro });
    });
}
module.exports = {
    getLibroTitulo,
    getLibroAutor,
    getLibroISBN,
    getLibroFecha,
    GetLibroDescripcion,
    getLibroEditorial,
    getLibroPrecio,
    getLibro,
    getLibros,
    createLibro,
    replaceLibro,
    editLibro,
    deleteLibro,
};