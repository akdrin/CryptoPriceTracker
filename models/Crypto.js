// models/Crypto.js
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/db'); // Make sure your sequelize instance is correctly configured

const Crypto = sequelize.define('Crypto', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    last: {
        type: DataTypes.DECIMAL,
        allowNull: false
    },
    buy: {
        type: DataTypes.DECIMAL,
        allowNull: false
    },
    sell: {
        type: DataTypes.DECIMAL,
        allowNull: false
    },
    volume: {
        type: DataTypes.DECIMAL,
        allowNull: false
    },
    base_unit: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

module.exports = Crypto;
