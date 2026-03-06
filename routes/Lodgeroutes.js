const express = require('express');
const router = express.Router();
const { getLodges } = require('../controllers/lodgeController');

router.get('/', getLodges);

module.exports = router;
