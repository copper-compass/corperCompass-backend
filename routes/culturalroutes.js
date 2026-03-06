const express = require('express');
const router = express.Router();
const { getCulture } = require('../controllers/cultureController');

router.get('/', getCulture);

module.exports = router;
