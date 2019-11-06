const express = require('express');
const librosController = require('../controllers/librosControllers');
const router = express.Router();
router.get('/libro/titulo/:titulo', librosController.getLibrosTitulo);
router.get('/libro/autor/:autor', librosController.getLibrosAutor);
router.get('/libro/ISBN/:ISBN', librosController.getLibrosISBN);
router.get('/libro/fecha/:fechapublicacion', librosController.getLibrosFecha);
router.get('/libro/descripcion/:descripcion', librosController.getLibrosDescripcion);
router.get('/libro/editorial/:editorial', librosController.getLibrosEditorial);
router.get('/libro/precio/:precio', librosController.getLibrosPrecio);
router.get('/:userId', librosController.getLibro);
router.post('/', librosController.createLibro);
router.put('/:userId', librosController.replaceLibro);
router.patch('/:userId', librosController.editLibro);
router.delete('/:userId', librosController.deleteLibro);

module.exports = router;