import express from 'express';
import { protect, admin } from '../middleware/authMiddleware.js';
import {
  getAreas,
  getAreaById,
  createArea,
  updateArea,
  deleteArea,
} from '../controllers/areaController.js';

const router = express.Router();

router.route('/')
  .get(getAreas)
  .post(protect, admin, createArea);

router.route('/:id')
  .get(getAreaById)
  .put(protect, admin, updateArea)
  .delete(protect, admin, deleteArea);

export default router;
