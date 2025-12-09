const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = 10000;

const frontendURL = 'https://truestate-frontend-2jbm.onrender.com'; // ⚠️ REPLACE THIS
const corsOptions = {
    origin: frontendURL,
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Specify allowed methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Specify allowed headers
    credentials: true // If you use cookies/sessions later
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json());

// Basic Route
app.get('/', (req, res) => {
    res.send('Retail Sales Management System API');
});

// Routes
const salesRoutes = require('./routes/salesRoutes');
app.use('/api/sales', salesRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
