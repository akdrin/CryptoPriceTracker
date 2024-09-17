// js/script.js

document.addEventListener('DOMContentLoaded', () => {
    // Function to fetch data from the server and update the table
    const fetchData = async () => {
        try {
            const response = await fetch('/crypto/stored');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const cryptos = await response.json();
            updateTable(cryptos);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    // Function to update the table with cryptocurrency data
    const updateTable = (cryptos) => {
        const tableBody = document.getElementById('crypto-table-body');
        tableBody.innerHTML = ''; // Clear existing rows

        cryptos.forEach((crypto, index) => {
            const row = document.createElement('tr');

            row.innerHTML = `
                <td>${index + 1}</td>
                <td>${crypto.name}</td>
                <td>${crypto.last}</td>
                <td>Buy: ${crypto.buy} / Sell: ${crypto.sell}</td>
                <td>${(crypto.sell - crypto.buy).toFixed(2)}</td>
                <td>${(crypto.sell - crypto.buy).toFixed(2)}</td>
            `;

            tableBody.appendChild(row);
        });
    };

    // Fetch data when the page loads
    fetchData();
});

