const express = require('express');

const router = express.Router();

// Example: GET /dashboard
router.get('/', (req, res) => {
    res.json({ message: 'Welcome to the Dashboard API!' });
});

// Add more dashboard-related routes here

module.exports = router;