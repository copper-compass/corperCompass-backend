const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { getJourney, updateChecklist } = require('../controllers/dashboardController');

router.get('/journey', protect, getJourney);
router.patch('/checklist/:id', protect, updateChecklist);

module.exports = router;
