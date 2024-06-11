const express = require('express');
const logic = require('./logic.js');
const app = express();
app.use(express.json());


app.get('/api/products', async (req, res) => {
    let products;
    if (req.query.name) {
        products = await logic.getProductsByName(req.query.name);
    } else {
        products = await logic.getAllProducts();
    }
    res.json(products);
});

app.get('/api/products/:id', async (req, res) => {
    const product = await logic.getProductById(req.params.id);
    if (!product) return res.status(404).send('Product not found');
    res.json(product);
});

app.post('/api/products', async (req, res) => {
    const product = await logic.createProduct(req.body);
    res.status(201).json(product);
});

app.put('/api/products/:id', async (req, res) => {
    await logic.updateProduct(req.body, req.params.id);
    res.sendStatus(204);
});

app.delete('/api/products/:id', async (req, res) => {
    await logic.deleteProduct(req.params.id);
    res.sendStatus(204);
});

module.exports = app;