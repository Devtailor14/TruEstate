const fs = require('fs');
const csv = require('csv-parser');
const db = require('../database');

const filePath = process.argv[2];
const BATCH_SIZE = 1000;

if (!filePath) {
    console.error('Please provide a path to the CSV file.');
    console.log('Usage: node scripts/import_csv.js <path_to_csv>');
    process.exit(1);
}

const HEADER_MAP = {
    'transaction id': 'transactionId',
    'date': 'date',
    'customer id': 'customerId',
    'customer name': 'customerName',
    'phone number': 'phoneNumber',
    'gender': 'gender',
    'age': 'age',
    'customer region': 'region',
    'customer type': 'customerType',
    'product id': 'productId',
    'product name': 'productName',
    'brand': 'brand',
    'product category': 'category',
    'tags': 'tags',
    'quantity': 'quantity',
    'price per unit': 'pricePerUnit',
    'discount percentage': 'discountPercentage',
    'total amount': 'totalAmount',
    'final amount': 'finalAmount',
    'payment method': 'paymentMethod',
    'order status': 'orderStatus',
    'delivery type': 'deliveryType',
    'store id': 'storeId',
    'store location': 'storeLocation',
    'salesperson id': 'salespersonId',
    'employee name': 'employeeName'
};

function mapRowToDb(row) {
    const mapped = {};
    for (const [key, value] of Object.entries(row)) {
        const lowerKey = key ? key.trim().toLowerCase() : '';
        const dbKey = HEADER_MAP[lowerKey];
        if (dbKey) {
            mapped[dbKey] = value;
        }
    }

    return {
        customerId: mapped.customerId || 'UNK',
        customerName: mapped.customerName || 'Unknown',
        phoneNumber: mapped.phoneNumber || '',
        gender: mapped.gender || 'Other',
        age: parseInt(mapped.age) || 0,
        region: mapped.region || 'North',
        customerType: mapped.customerType || 'Regular',
        productId: mapped.productId || 'P000',
        productName: mapped.productName || 'Imported Product',
        brand: mapped.brand || 'Generic',
        category: mapped.category || 'Uncategorized',
        tags: mapped.tags || '',
        quantity: parseInt(mapped.quantity) || 1,
        pricePerUnit: parseFloat(mapped.pricePerUnit) || 0,
        discountPercentage: parseFloat(mapped.discountPercentage) || 0,
        totalAmount: parseFloat(mapped.totalAmount) || 0,
        finalAmount: parseFloat(mapped.finalAmount) || parseFloat(mapped.totalAmount) || 0,
        date: mapped.date ? new Date(mapped.date).toISOString() : new Date().toISOString(),
        paymentMethod: mapped.paymentMethod || 'Cash',
        orderStatus: mapped.orderStatus || 'Completed',
        deliveryType: mapped.deliveryType || 'Store Pickup',
        storeId: mapped.storeId || 'S001',
        storeLocation: mapped.storeLocation || 'Main St',
        employeeName: mapped.employeeName || 'Admin'
    };
}

let count = 0;
let transactionStarted = false;

// Prepare statement
const stmt = db.prepare(`INSERT INTO sales (
    customerId, customerName, phoneNumber, gender, age, region, customerType,
    productId, productName, brand, category, tags, quantity, pricePerUnit,
    discountPercentage, totalAmount, finalAmount, date, paymentMethod,
    orderStatus, deliveryType, storeId, storeLocation, employeeName
) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, (err) => {
    if (err) console.error("Prepare error:", err);
});

db.serialize(() => {
    console.log("Clearing existing sales data...");
    db.run("DELETE FROM sales", (err) => { if (err) console.error("Delete error:", err); });
    db.run("DELETE FROM sqlite_sequence WHERE name='sales'", (err) => { if (err) console.error("Sequence error:", err); });

    console.log("Starting import...");
    db.run("BEGIN TRANSACTION", (err) => {
        if (err) {
            console.error("Begin transaction error:", err);
            return;
        }
        transactionStarted = true;
        startStream();
    });
});

function startStream() {
    const stream = fs.createReadStream(filePath).pipe(csv());

    stream.on('data', (row) => {
        const r = mapRowToDb(row);
        stmt.run(
            r.customerId, r.customerName, r.phoneNumber, r.gender, r.age, r.region, r.customerType,
            r.productId, r.productName, r.brand, r.category, r.tags, r.quantity, r.pricePerUnit,
            r.discountPercentage, r.totalAmount, r.finalAmount, r.date, r.paymentMethod,
            r.orderStatus, r.deliveryType, r.storeId, r.storeLocation, r.employeeName,
            (err) => {
                if (err) console.log('Insert error row ' + count + ':', err.message);
            }
        );
        count++;

        if (count % BATCH_SIZE === 0) {
            stream.pause();
            db.run("COMMIT", (err) => {
                if (err) {
                    console.error("Commit error at " + count + ":", err.message);
                    stream.destroy(); // Stop completely
                    return;
                }
                db.run("BEGIN TRANSACTION", (err) => {
                    if (err) {
                        console.error("Re-begin error at " + count + ":", err.message);
                        stream.destroy();
                        return;
                    }
                    process.stdout.write(`\rImported ${count} rows...`);
                    stream.resume();
                });
            });
        }
    })
        .on('end', () => {
            stmt.finalize();
            if (transactionStarted) {
                db.run("COMMIT", (err) => {
                    if (err) console.error("Final commit error:", err.message);
                    else console.log(`\nSuccessfully imported ${count} records.`);
                });
            } else {
                console.log("No records found in CSV.");
            }
        })
        .on('error', (err) => {
            console.error("CSV Parse Error:", err);
            if (transactionStarted) db.run("ROLLBACK");
        });
}
