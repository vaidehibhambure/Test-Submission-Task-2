const database = require('./database.js');
async function getAllProducts() {
    const connection = await database.connectDB();
    const [rows] = await connection.execute('SELECT * FROM Products');
    return rows;
}

async function getProductById(id) {
    const connection = await database.connectDB();
    const [rows] = await connection.execute('SELECT * FROM Products WHERE id = ?', [id]);
    return rows[0];
}

async function createProduct(product) {
    try {
        const connection = await database.connectDB();
        const { name, description, price, quantity, category } = product;
        const result = await connection.execute('INSERT INTO Products (name, description, price, quantity, category) VALUES (?, ?, ?, ?, ?)', //
            [name, description, price, quantity, category]);
        return { id: result[0].insertId };
    } catch (error) {
        console.error(error);
        throw error;
    }
}

async function updateProduct(product, id) {
    const connection = await database.connectDB();
    const { name, description, price, quantity, category } = product;
    await connection.execute('UPDATE Products SET name = ?, description = ?, price = ?, quantity = ?, category = ? WHERE id = ?',
        [name, description, price, quantity, category, id]);
}

async function deleteProduct(id) {
    const connection = await database.connectDB();
    await connection.execute('DELETE FROM Products WHERE id = ?', [id]);
}

async function getProductsByName(keyword) {
    const connection = await database.connectDB();
    const [rows] = await connection.execute('SELECT * FROM Products WHERE name LIKE ?', [`%${keyword}%`]);
    return rows;
}

async function deleteAllProducts() {
    const connection = await database.connectDB();
    await connection.execute('DELETE FROM Products');
}

module.exports = {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
    getProductsByName,
    deleteAllProducts
};