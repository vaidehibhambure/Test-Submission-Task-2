const chai = require('chai');
const expect = chai.expect;
const logic = require('../../logic');
let testId = 0;

describe('Logic Unit Tests', () => {

    it('should retrieve all products', async () => {
        const products = await logic.getAllProducts();
        expect(products).to.be.an('array');
        expect(products).to.have.length.above(0);
    });

    it('should create a new products', async () => {
        const newProduct = { name: 'Bottle', description: 'water bottle', price: 100, quantity: 10, category: 'Accessory' };
        const result = await logic.createProduct(newProduct);
        expect(result).to.be.an('object');
        expect(result.id).to.be.a('number');
        testId = parseInt(result.id);
        console.log(result.id);
    });

    it('should retrieve products by name', async () => {
        const products = await logic.getProductsByName('Bottle');
        expect(products).to.be.an('array');
        expect(products).to.have.length.above(0);
        expect(products[0].name).to.include('Bottle');
    });

    it('should retrieve a product by ID', async () => {
        const product = await logic.getProductById(testId);
        expect(product).to.be.an('object');
        expect(product.id).to.equal(testId);
    });

    it('should update a product', async () => {
        const updatedProduct = { name: 'Pen', description: 'gel', price: 45, quantity: 25, category: 'Statonary' };
        await logic.updateProduct(updatedProduct, testId);
        const product = await logic.getProductById(testId);
        expect(product.name).to.equal('Pen');
        expect(product.price).to.equal(45);
    });

    it('should delete a product by ID', async () => {
        await logic.deleteProduct(testId);
        const products = await logic.getAllProducts();
        expect(products.find(p => p.id === testId)).to.be.undefined;
    });
});