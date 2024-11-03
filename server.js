// server.js

const express = require('express');
const config = require('./config/config'); // Assure-toi que le chemin est correct
const cocktailRoutes = require('./routes/cocktailRoutes'); // Import des routes
const userRoutes = require('./routes/userRoutes'); // Import des routes

const app = express();
require('dotenv').config();

// Middleware pour parser le corps des requêtes (JSON)
app.use(express.json());

// Utiliser les routes de cocktails
app.use('/cocktails', cocktailRoutes); // Ajoute le préfixe '/cocktails'
app.use('/users', userRoutes); // Ajoute le préfixe '/users'

// Lancer le serveur
app.listen(config.port, () => {
    console.log(`Server is running on port ${config.port}`);
});
