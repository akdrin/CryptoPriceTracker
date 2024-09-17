const express = require('express');
const path = require('path');
const db = require('./config/db'); // Sequelize instance
const cryptoRoutes = require('./routes/crypto');

const app = express();

// Middleware for JSON
app.use(express.json());

// Serve static files (HTML, CSS, JS)
app.use(express.static(path.join(__dirname, 'public')));

// Define the crypto routes
app.use('/crypto', cryptoRoutes);

// Test the database connection
db.authenticate()
    .then(() => {
        console.log('Database connected successfully.');
    })
    .catch(err => {
        console.error('Error connecting to the database:', err);
    });

// Root route to serve index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

