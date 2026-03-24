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
      body('stateCode').optional().trim().escape(),
      body('ppa').optional().trim().escape(),
      body('lga').optional().trim().escape(),
      body('batch').optional().trim().escape(),
    ],
    validateRequest,
    updateProfile
  );

export default router;
