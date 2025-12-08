const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.join(__dirname, 'database.sqlite');

const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Error opening database ' + dbPath + ': ' + err.message);
    } else {
        console.log('SQLite database connected.');

        // Initialize Tables
        db.run(`CREATE TABLE IF NOT EXISTS sales (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            customerId TEXT,
            customerName TEXT,
            phoneNumber TEXT,
            gender TEXT,
            age INTEGER,
            region TEXT,
            customerType TEXT,
            productId TEXT,
            productName TEXT,
            brand TEXT,
            category TEXT,
            tags TEXT, 
            quantity INTEGER,
            pricePerUnit REAL,
            discountPercentage INTEGER,
            totalAmount REAL,
            finalAmount REAL,
            date TEXT,
            paymentMethod TEXT,
            orderStatus TEXT,
            deliveryType TEXT,
            storeId TEXT,
            storeLocation TEXT,
            employeeName TEXT
        )`, (err) => {
            if (err) {
                console.error("Error creating sales table:", err);
            }
        });
    }
});

module.exports = db;
