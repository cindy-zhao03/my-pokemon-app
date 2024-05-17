const express = require('express');
const axios = require('axios');
const path = require('path');

const app = express();

// Set EJS as the templating engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware to serve static files like CSS
app.use(express.static(path.join(__dirname, 'public')));

// Route to get the Pokémon card based on name or id
app.get('/card', async (req, res) => {
    const searchTerm = req.query.searchTerm.trim().toLowerCase();  // Trim whitespace and convert to lowercase
    const apiUrl = `https://pokeapi.co/api/v2/pokemon/${searchTerm}/`;

    console.log("Requesting data from:", apiUrl);  // Log the URL being requested

    try {
        const response = await axios.get(apiUrl);
        const pokemon = response.data;

        res.render('card', { pokemon, error: null });
    } catch (error) {
        console.error("Error fetching data:", error);  // Log any errors that occur
        res.render('card', { error: 'Error fetching data from API.', pokemon: null });
    }
});

// Home route to render a simple form
app.get('/', (req, res) => {
    res.render('index');
});

// Route to get a random Pokémon
app.get('/random', async (req, res) => {
    const randomId = Math.floor(Math.random() * 898) + 1;  // Random Pokémon ID between 1 and 898
    const apiUrl = `https://pokeapi.co/api/v2/pokemon/${randomId}/`;

    console.log("Requesting random Pokémon data from:", apiUrl);  // Log the URL being requested

    try {
        const response = await axios.get(apiUrl);
        const pokemon = response.data;

        res.render('card', { pokemon, error: null });
    } catch (error) {
        console.error("Error fetching data:", error);  // Log any errors that occur
        res.render('card', { error: 'Error fetching data from API.', pokemon: null });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});