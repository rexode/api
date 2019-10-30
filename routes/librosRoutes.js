const express = require('express');
const userController = require('../controllers/librosController');
const router = express.Router();
router.get('/', userController.getUsers);
router.get('/:userId', userController.getUser);
router.post('/', userController.createUser);
router.put('/:userId', userController.replaceUser);
router.patch('/:userId', userController.editUser);
router.delete('/:userId', userController.deleteUser);

module.exports = router;