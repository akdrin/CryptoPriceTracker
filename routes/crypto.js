const express = require('express');
const router = express.Router();
const axios = require('axios');
const Crypto = require('../models/Crypto');

// Fetch top 10 from WazirX API and store in the database
router.get('/fetch', async (req, res) => {
    try {
        // Fetch data from the API
        const { data } = await axios.get('https://api.wazirx.com/api/v2/tickers');
        
        // Log the entire data object to understand its structure
        console.log('Fetched data:', data);
        
        // Extract the top 10 cryptocurrencies
        const top10 = Object.values(data).slice(0, 10);
        
        // Log the top 10 cryptocurrencies to verify
        console.log('Top 10 cryptocurrencies:', top10);

        // Clear old data from the database
        await Crypto.destroy({ where: {} });

        // Store top 10 results in the database
        const insertPromises = top10.map(crypto => {
            return Crypto.create({
                name: crypto.name,
                last: crypto.last,
                buy: crypto.buy,
                sell: crypto.sell,
                volume: crypto.volume,
                base_unit: crypto.base_unit
            });
        });

        await Promise.all(insertPromises);
        res.status(200).json({ message: 'Data fetched and stored successfully.' });
    } catch (error) {
        console.error('Error fetching or storing data:', error);
        res.status(500).json({ error: 'Failed to fetch or store data' });
    }
});

// Route to retrieve stored data from the database
router.get('/stored', async (req, res) => {
    try {
        const cryptos = await Crypto.findAll();
        res.status(200).json(cryptos);
    } catch (error) {
        console.error('Error retrieving data:', error);
        res.status(500).json({ error: 'Failed to retrieve data' });
    }
});

module.exports = router;


