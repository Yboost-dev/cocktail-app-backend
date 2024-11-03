const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Exemple de route pour obtenir tous les utilisateurs
router.get('/AllUsers', userController.getAllUsers);

// Autres routes pour les utilisateurs
// router.post('/', userController.createUser);
// router.get('/:id', userController.getUserById);
// router.put('/:id', userController.updateUser);
// router.delete('/:id', userController.deleteUser);

module.exports = router;
