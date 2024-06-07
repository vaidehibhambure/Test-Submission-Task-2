const express = require('express');
const logic = require('./logic.js');
const app = express();
app.use(express.json());

app.get('/api/products', async (req, res) => {
    const products = await logic.getAllProducts();
    res.json(products);
});

app.get('/api/getproduct/:id', async (req, res) => {
    const id = req.params.id
    const product = await logic.getProductById(id)
    res.json({ message: 'Product info recieved successfully', product: product });
});

app.get('/api/productbyname', async (req, res) => {
    const { name } = req.body;
    const product = await logic.getProductsByName(name)
    res.json({ message: 'Product info recieved successfully.', product: product });
});

app.post('/api/createproduct', async (req, res) => {
    const product = req.body[0];
    const productid = await logic.createProduct(product)
    res.json({ message: 'Product created successfully.', info: productid });
});

app.post('/api/updateproduct/:id', async (req, res) => {
    const id = req.params.id;
    const product = req.body[0];
    const productid = await logic.updateProduct(product, id)
    res.json({ message: 'Product updated successfully.', info: productid });
});

app.delete('/api/deleteproduct/:id', async (req, res) => {
    const id = req.params.id;
    const prodid = await logic.deleteProduct(id)
    res.json({ message: 'Product deleted successfully.', prodid });
});

module.exports = app;