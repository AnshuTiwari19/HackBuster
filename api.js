// routes/api.js
const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Create a new user
router.post('/users', async (req, res) => {
    const { name, email, password } = req.body;
    const newUser  = new User({ name, email, password });
    try {
        await newUser .save();
        res.status(201).json(newUser );
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Get all users
router.get('/users', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
