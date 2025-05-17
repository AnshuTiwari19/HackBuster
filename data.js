const express = require('express');
const router = express.Router();
const dataController = require('../controllers/dataController');

router.post('/save', dataController.saveData);
router.get('/get', dataController.getData);

module.exports = router;