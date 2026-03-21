import express from 'express';
import { protect, admin } from '../middleware/authMiddleware.js';
import {
  getJourney,
  getProgress,
  toggleChecklistItem,
  createSection,
  createChecklistItem,
} from '../controllers/checklistController.js';

const router = express.Router();

router.get('/journey', protect, getJourney);
router.get('/progress', protect, getProgress);
router.patch('/:itemId', protect, toggleChecklistItem);

// Admin routes for managing checklist structure
router.post('/sections', protect, admin, createSection);
router.post('/items', protect, admin, createChecklistItem);

export default router;
