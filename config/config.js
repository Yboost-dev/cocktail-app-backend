// config/config.js

// Configuration du port
const port = process.env.PORT || 4000; // Utilise la variable d'environnement ou un port par défaut

// Configuration de la base de données
const databaseUrl = process.env.DATABASE_URL; // Pour obtenir l'URL de la base de données

// Exporte les configurations
module.exports = {
    port,
    databaseUrl,
};
