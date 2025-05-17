const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('./db');

const authRoutes = require('./routes/auth');
const dataRoutes = require('./routes/data');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use('/api/auth', authRoutes);
app.use('/api/data', dataRoutes);

const PORT = 5000;
app.listen(PORT, () => console.log(Server running on port ${PORT}));