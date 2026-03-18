import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import { getProfile, updateProfile } from '../controllers/userController.js';

const router = express.Router();

router.route('/profile')
  .get(protect, protect, getProfile)
  .put(protect, protect, updateProfile);

export default router;
