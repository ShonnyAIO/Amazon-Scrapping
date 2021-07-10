const express = require('express');
const request = require('request-promise');

const app = express();

const PORT = process.env.PORT || 5000;

// const apiKey = '94b3a291c1ca884dc9cc4100d8ec77a2';
const generateScraperUrl = (apiKey) => `http://api.scraperapi.com?api_key=${apiKey}&autoparse=true`;

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Bienvenido a Amazon Scrapper API - Jonathan Torres');
});

// Get product details
app.get('/producto/:productId', async (req, res) => {
    const { productId } = req.params;
    const { api_key } = req.query;
    try {
        const response = await request(`${generateScraperUrl(api_key)}&url=https://www.amazon.com/dp/${productId}`);
        res.json(JSON.parse(response));
    } catch (error) {
        res.json(error);
    }
});


// Get product reviews
app.get('/producto/:productId/reputacion', async (req, res) => {
    const { productId } = req.params;
    const { api_key } = req.query;
    try {
        const response = await request(`${generateScraperUrl(api_key)}&url=https://www.amazon.com/product-reviews/${productId}`);
        res.json(JSON.parse(response));
    } catch (error) {
        res.json(error);
    }
});

// Get product offers
app.get('/producto/:productId/ofertas', async (req, res) => {
    const { productId } = req.params;
    const { api_key } = req.query;
    try {
        const response = await request(`${generateScraperUrl(api_key)}&url=https://www.amazon.com/gp/offer-listing/${productId}`);
        res.json(JSON.parse(response));
    } catch (error) {
        res.json(error);
    }
});

// Get search results
app.get('/busqueda/:searchQuery', async (req, res) => {
    const { searchQuery } = req.params;
    const { api_key } = req.query;
    try {
        const response = await request(`${generateScraperUrl(api_key)}&url=https://www.amazon.com/s?k=${searchQuery}`);
        res.json(JSON.parse(response));
    } catch (error) {
        res.json(error);
    }
});

app.listen(PORT, () => {
    console.log('Servidor iniciando en el puerto:', PORT);
});

