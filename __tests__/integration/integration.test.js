const request = require('supertest');
const server = require('../../app.js');
const expect = require('chai').expect;

describe('Integration Tests', () => {
    let createdProductId;

    before(async () => {
        // Here you can set up your test database if necessary
    });
    after(async () => {
        // Clean up your test database if necessary
    });

    it('should retrieve all products', async () => {
        const res = await request(server).get('/api/products');
        expect(res.status).to.equal(200);
        expect(res.body).to.be.an('array');
    });

    it('should create a new product', async () => {
        const newProduct = {
            name: 'Test Chair',
            description: 'A comfortable test chair',
            price: 50.00,
            quantity: 5,
            category: 'Test Furniture'
        };
        const res = await request(server).post('/api/products').send(newProduct);
        expect(res.status).to.equal(201);
        expect(res.body).to.be.an('object');
        expect(res.body.id).to.be.a('number');
        createdProductId = res.body.id;
    });

    it('should retrieve a product by ID', async () => {
        console.log('Retrieving product ID:', createdProductId); // Add this line
        const res = await request(server).get(`/api/products/${createdProductId}`);
        console.log('Retrieve product response:', res.body); // Add this line
        expect(res.status).to.equal(200);
        expect(res.body).to.be.an('object');
        expect(res.body.id).to.equal(createdProductId); // Corrected comparison
    });

    it('should retrieve products by name', async () => {
        const newProduct = {
            name: 'Test Chair',
            description: 'A comfortable test sofa',
            price: 150.00,
            quantity: 2,
            category: 'Test Furniture'
        };
        await request(server).post(`/api/products`).send(newProduct);
        const res = await request(server).get(`/api/products?name=Test Chair`);
        expect(res.status).to.equal(200);
        expect(res.body).to.be.an('array');
        expect(res.body[0].name).to.equal('Test Chair');
    });

    it('should update a product', async () => {
        const updatedProduct = { name: 'Updated Test Chair', description: 'An updated test chair', price: 60.00, quantity: 3, category: 'Updated Test Furniture' };
        const res = await request(server).put(`/api/products/${createdProductId}`).send(updatedProduct);
        console.log("I am here");
        expect(res.status).to.equal(204);

        // Verify the update
        const getRes = await request(server).get(`/api/products/${createdProductId}`);
        //console.log("I am here now");//
        expect(getRes.status).to.equal(200);
        expect(getRes.body.name).to.equal('Updated Test Chair');
    });

    it('should delete a product by ID', async () => {
        const res = await request(server).delete(`/api/products/${createdProductId}`);
        expect(res.status).to.equal(204);
        // Verify the deletion
        const getRes = await request(server).get(`/api/products/${createdProductId}`);
        expect(getRes.status).to.equal(404); // assuming you return a 404 for not found
    });
});
