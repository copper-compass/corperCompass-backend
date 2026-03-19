import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import {
  startNegotiation,
  getMyNegotiations,
  getNegotiationById,
  updateNegotiation,
  addNegotiationMessage,
} from '../controllers/negotiationController.js';

const router = express.Router();

router.route('/')
  .post(protect, startNegotiation)
  .get(protect, getMyNegotiations);

router.route('/:id')
  .get(protect, getNegotiationById)
  .put(protect, updateNegotiation);

router.post('/:id/messages', protect, addNegotiationMessage);

export default router;
