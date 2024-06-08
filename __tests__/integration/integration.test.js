const request = require('supertest');
const server = require('../../app.js');
const expect = require('chai').expect;
describe('Integration Tests', () => {
    let createdProductId;

    it('should retrieve all products', async () => {
        const res = await request(server).get('/api/products');
        expect(res.status).to.equal(200);
        expect(res.body).to.be.an('array');
    });

    it('should create a new product', async function () {
        const newProduct = [{ "name": "Postman Test", "description": "PM Description", "price": 100, "quantity": "20", "category": "Postman" }];
        const res = await request(server).post('/api/createproduct').send(newProduct);
        expect(res.status).to.equal(200);
        expect(res.body.info.id).to.be.a('number');
        createdProductId = res.body.info.id;
        console.log(createdProductId);
    });

    it('should retrieve a product by ID', async function () {
        console.log(createdProductId);
        const res = await request(server).get('/api/getproduct/' + createdProductId);
        console.log('Retrieve product response:', res.body);
        expect(res.status).to.equal(200);
        expect(res.body.product.id).to.equal(createdProductId);
    });

    it('should retrieve a product by Name', async function () {
        const productName = "Postman"
        const res = await request(server).get('/api/productbyname/' + productName);
        console.log('Retrieve product response:', res.body);
        expect(res.status).to.equal(200);
    });

    it('should update a product', async function () {
        const productId = createdProductId;
        const product = [{ "name": "Postman Updated", "description": "PM Updated", "price": 100, "quantity": "20", "category": "Postman" }];
        const res = await request(server).post('/api/updateproduct/' + createdProductId).send(product);
        console.log('Update product response:', res.body);
        expect(res.status).to.equal(200);
    });

    it('should delete a product by ID', async function () {
        const res = await request(server).delete('/api/deleteproduct/' + createdProductId);
        expect(res.status).to.equal(200);
        // Verify the deletion
        const getRes = await request(server).get(`/api/products/${createdProductId}`);
        expect(getRes.status).to.equal(404); // assuming you return a 404 for not found
    });
});
