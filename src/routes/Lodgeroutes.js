import express from 'express';
import { protect, admin } from '../middleware/authMiddleware.js';
import {
  getLodges,
  getLodgeById,
  createLodge,
  updateLodge,
  deleteLodge,
} from '../controllers/lodgeController.js';

const router = express.Router();

router.route('/')
  .get(getLodges)
  .post(protect, admin, createLodge);

router.route('/:id')
  .get(getLodgeById)
  .put(protect, admin, updateLodge)
  .delete(protect, admin, deleteLodge);

export default router;
