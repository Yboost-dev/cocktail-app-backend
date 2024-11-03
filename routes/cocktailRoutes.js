const express = require('express');
const router = express.Router();
const cocktailController = require('../controllers/cocktailController');

// Exemple de route pour obtenir tous les cocktails
router.get('/AllCocktails', cocktailController.getAllCocktails);

// Autres routes pour les cocktails
// router.post('/', cocktailController.createCocktail);
// router.get('/:id', cocktailController.getCocktailById);
// router.put('/:id', cocktailController.updateCocktail);
// router.delete('/:id', cocktailController.deleteCocktail);

module.exports = router;
