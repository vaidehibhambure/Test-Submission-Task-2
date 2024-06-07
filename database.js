const mysql = require('mysql2/promise');
async function connectDB() {
    try {
        connection = await mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: 'Kushal@249',
            database: 'users'
        });
        console.log("Connected to the database.");
        return connection;
    } catch (error) {
        console.error("Something went wrong with connecting to db", error);
    }
};
module.exports = { connectDB }; // Export functions