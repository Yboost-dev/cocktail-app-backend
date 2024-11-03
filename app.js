// app.js

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const cocktailRoutes = require('./routes/cocktailRoutes'); // Vérifie que le chemin est correct
const userRoutes = require('./routes/userRoutes'); // Vérifie que le chemin est correct
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use('/api/cocktails', cocktailRoutes);
app.use('/api/users', userRoutes);

// Gestion des erreurs
app.use((req, res, next) => {
    res.status(404).json({ message: 'Not Found' });
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong!' });
});

module.exports = app;
