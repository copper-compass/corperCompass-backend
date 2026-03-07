import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import {
  sendMessage,
  getMyMessages,
  getConversation,
  markAsRead,
} from '../controllers/messageController.js';

const router = express.Router();

router.route('/')
  .post(protect, sendMessage)
  .get(protect, getMyMessages);

router.get('/conversation/:userId', protect, getConversation);
router.patch('/:id/read', protect, markAsRead);

export default router;
