// controllers/userController.js

// Fonction pour obtenir tous les utilisateurs
const getAllUsers = (req, res) => {
    res.json({ message: 'Retourne tous les utilisateurs' });
};

module.exports = {
    getAllUsers,
};
