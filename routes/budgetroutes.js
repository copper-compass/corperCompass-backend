const express = require('express');
const router = express.Router();
const { calculateBudget } = require('../controllers/budgetController');

router.post('/calculate', calculateBudget);

module.exports = router;
