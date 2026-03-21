import express from 'express';
import { body } from 'express-validator';
import { protect } from '../middleware/authMiddleware.js';
import { getProfile, updateProfile } from '../controllers/userController.js';
import { validateRequest } from '../middleware/validationMiddleware.js';

const router = express.Router();

router.route('/profile')
  .get(protect, getProfile)
  .put(
    protect,
    [
      body('postedState').optional().trim().escape(),
      body('phone').optional().trim().escape(),
      // preferences is a Map, cannot be escaped easily; we assume it's safe or handled elsewhere.
    ],
    validateRequest,
    updateProfile
  );

export default router;
