const { Sequelize } = require('sequelize');

// Create a Sequelize instance (MySQL)
const sequelize = new Sequelize('crypto_db', 'root', '9956', {
    host: 'localhost',
    dialect: 'mysql',  // Specify the database dialect as MySQL
});

// Test the connection
sequelize.authenticate()
    .then(() => {
        console.log('Connection to MySQL database has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the MySQL database:', err);
    });

module.exports = sequelize;


