const db = require('../database');

const REGIONS = ['North', 'South', 'East', 'West'];
const GENDERS = ['Male', 'Female', 'Other'];
const CATEGORIES = ['Electronics', 'Clothing', 'Home', 'Beauty', 'Sports'];
const PAYMENT_METHODS = ['Credit Card', 'Debit Card', 'UPI', 'Cash'];
const STATUSES = ['Completed', 'Pending', 'Cancelled', 'Returned'];
const FIRST_NAMES = ['Aarav', 'Vivaan', 'Aditya', 'Vihaan', 'Arjun', 'Saanvi', 'Anya', 'Diya', 'Pari', 'Ananya'];
const LAST_NAMES = ['Sharma', 'Verma', 'Gupta', 'Singh', 'Patel', 'Kumar', 'Das', 'Rao', 'Nair', 'Mehta'];
const BRANDS = ['BrandA', 'BrandB', 'BrandC', 'BrandD', 'BrandE'];
const TAGS_POOL = ['New', 'Sale', 'Bestseller', 'Limited', 'Eco-friendly'];

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomElement(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

function generateDate(start, end) {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime())).toISOString();
}

function generateData(count = 500) {
    const startDate = new Date('2023-01-01');
    const endDate = new Date('2025-12-01');

    db.serialize(() => {
        db.run("DELETE FROM sales"); // Clear existing data

        const stmt = db.prepare(`INSERT INTO sales (
            customerId, customerName, phoneNumber, gender, age, region, customerType,
            productId, productName, brand, category, tags, quantity, pricePerUnit,
            discountPercentage, totalAmount, finalAmount, date, paymentMethod,
            orderStatus, deliveryType, storeId, storeLocation, employeeName
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`);

        for (let i = 1; i <= count; i++) {
            const quantity = getRandomInt(1, 10);
            const price = getRandomInt(10, 500) * 10;
            const discount = getRandomInt(0, 30);
            const totalAmount = quantity * price;
            const finalAmount = totalAmount * (1 - discount / 100);

            // Store tags as JSON string or comma-separated for simple query simulation
            // JSON string is better for storage, comma-separated for simple LIKE queries if not using JSON extension
            // We'll use comma separated for simplicity in SQLite LIKE querying: ",tag1,tag2,"
            const tags = [getRandomElement(TAGS_POOL), getRandomElement(TAGS_POOL)];
            const tagsString = tags.join(',');

            stmt.run(
                `C${1000 + i}`,
                `${getRandomElement(FIRST_NAMES)} ${getRandomElement(LAST_NAMES)}`,
                `9${getRandomInt(100000000, 999999999)}`,
                getRandomElement(GENDERS),
                getRandomInt(18, 70),
                getRandomElement(REGIONS),
                getRandomInt(0, 1) ? 'Premium' : 'Regular',
                `P${getRandomInt(100, 200)}`,
                `Product ${getRandomInt(1, 50)}`,
                getRandomElement(BRANDS),
                getRandomElement(CATEGORIES),
                tagsString,
                quantity,
                price,
                discount,
                totalAmount,
                parseFloat(finalAmount.toFixed(2)),
                generateDate(startDate, endDate),
                getRandomElement(PAYMENT_METHODS),
                getRandomElement(STATUSES),
                getRandomInt(0, 1) ? 'Home Delivery' : 'Store Pickup',
                `S${getRandomInt(1, 5)}`,
                `Location ${getRandomInt(1, 5)}`,
                `Emp ${getRandomElement(FIRST_NAMES)}`
            );
        }

        stmt.finalize();
        console.log(`Generated and inserted ${count} records into SQLite.`);
    });
}

generateData();

