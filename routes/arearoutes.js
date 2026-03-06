const express = require('express');
const router = express.Router();
const { getAreas, getAreasByState } = require('../controllers/areaController');

router.get('/', getAreas);
router.get('/:state', getAreasByState);

module.exports = router;
