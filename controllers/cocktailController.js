// controllers/cocktailController.js

// Fonction pour obtenir tous les cocktails
const getAllCocktails = (req, res) => {
    res.json({ message: 'Retourne tous les cocktails' });
};

module.exports = {
    getAllCocktails,
};
