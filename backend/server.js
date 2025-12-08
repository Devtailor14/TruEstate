const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
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
