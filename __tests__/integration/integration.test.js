const request = require('supertest');
const server = require('../../app');
const expect = require('chai').expect;
describe('Integration Tests', () => {
    let createdProductId;
    beforeEach(async () => {
        await request(server).delete('/products');
    });
    after(async () => {
        // Clean up the database after all tests
        await request(server).delete('/products');
    });
    it('should retrieve all products', async () => {
        const res = await request(server).get('/products');
        expect(res.status).to.equal(200);
        expect(res.body).to.be.an('array');
    });
    it('should create two new product', async () => {
        const newProduct = { name: 'Test Chair', description: 'A comfortable test chair', price: 50.00, quantity: 5, category: 'Test Furniture' };
        const res = await request(server).post('/products').send(newProduct);
        expect(res.status).to.equal(200);
        expect(res.body).to.be.an('object');
        expect(res.body.id).to.be.a('number');
        createdProductId = res.body.id;
        const newProduct1 = { name: 'Sofa Chair', description: 'A comfortable test sofa chair', price: 100.00, quantity: 8, category: 'Test Furniture' };
        const res1 = await request(server).post('/products').send(newProduct1);
        expect(res1.status).to.equal(200);
        expect(res1.body).to.be.an('object');
        expect(res1.body.id).to.be.a('number');
    });
    it('should retrieve a product by ID', async () => {
        // Ensure a product is created first
        const newProduct = { name: 'Test Chair', description: 'A comfortable test chair', price: 50.00, quantity: 5, category: 'Test Furniture' };
        const resCreate = await request(server).post('/api/products').send(newProduct);
        expect(resCreate.status).to.equal(200);
        createdProductId = resCreate.body.id;
        expect(createdProductId).to.be.a('number');
        // Now retrieve the created product by ID
        const res = await request(server).get(`/api/products/${createdProductId}`);
        expect(res.status).to.equal(200);
        expect(res.body).to.be.an('object');
        expect(res.body.id).to.equal(createdProductId);
    });
    it('should update a product', async () => {
        // Ensure a product is created first
        const newProduct = { name: 'Test Chair', description: 'A comfortable test chair', price: 50.00, quantity: 5, category: 'Test Furniture' };
        const resCreate = await request(server).post('/api/products').send(newProduct);
        expect(resCreate.status).to.equal(200);
        createdProductId = resCreate.body.id;
        expect(createdProductId).to.be.a('number');
        // Now update the created product
        const updatedProduct = { name: 'Updated Test Chair', description: 'An updated test chair', price: 60.00, quantity: 3, category: 'Updated Test Furniture' };
        const resUpdate = await request(server).put(`/api/products/${createdProductId}`).send(updatedProduct);
        expect(resUpdate.status).to.equal(204);
        // Verify the update
        const getRes = await request(server).get(`/api/products/${createdProductId}`);
        expect(getRes.status).to.equal(200);
        expect(getRes.body).to.be.an('object');
        expect(getRes.body.name).to.equal('Updated Test Chair');
    });
    it('should retrieve products by name', async () => {
        const newProduct = { name: 'Test Sofa', description: 'A comfortable test sofa', price: 150.00, quantity: 2, category: 'Test Furniture' };
        await request(server).post('/api/products').send(newProduct);
        const res = await request(server).get('/api/products?name=Test Sofa');
        expect(res.status).to.equal(200);
        expect(res.body).to.be.an('array');
        expect(res.body[0].name).to.equal('Test Sofa');
    });
    it('should delete a product by ID', async () => {
        // Ensure a product is created first
        const newProduct = { name: 'Test Chair', description: 'A comfortable test chair', price: 50.00, quantity: 5, category: 'Test Furniture' };
        const resCreate = await request(server).post('/api/products').send(newProduct);
        expect(resCreate.status).to.equal(200);
        createdProductId = resCreate.body.id;
        expect(createdProductId).to.be.a('number');
        // Now delete the created product by ID
        const res = await request(server).delete(`/api/products/${createdProductId}`);
        expect(res.status).to.equal(204);
        // Verify the deletion
        const getRes = await request(server).get(`/api/products/${createdProductId}`);
        expect(getRes.status).to.equal(404); // assuming you return a 404 for not found
    });
    it('should delete all products', async () => {
        const res = await request(server).delete('/api/products');
        expect(res.status).to.equal(204);
        // Verify the deletion
        const getRes = await request(server).get('/api/products');
        expect(getRes.status).to.equal(200);
        expect(getRes.body).to.be.an('array').that.is.empty;
    });
});