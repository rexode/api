const express = require('express');
const librosControllers = require('../controllers/librosControllers');
const router = express.Router();
router.get('/libro/titulo/:titulo', librosControllers.getLibroTitulo);
router.get('/libro/autor/:autor', librosControllers.getLibroAutor);
router.get('/libro/ISBN/:ISBN', librosControllers.getLibroISBN);
router.get('/libro/fecha/:fechapublicacion', librosControllers.getLibroFecha);
router.get('/libro/descripcion/:descripcion', librosControllers.getLibroDescripcion);
router.get('/libro/editorial/:editorial', librosControllers.getLibroEditorial);
router.get('/libro/precio/:precio', librosControllers.getLibroPrecio);
router.get('/:bookId', librosControllers.getLibro);
router.post('/', librosControllers.createLibro);
router.put('/:bookId', librosControllers.replaceLibro);
router.patch('/:bookId', librosControllers.editLibro);
router.delete('/:bookId', librosControllers.deleteLibro);

module.exports = router;