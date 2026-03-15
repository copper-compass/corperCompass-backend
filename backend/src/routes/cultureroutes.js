import express from 'express';
import { protect, admin } from '../middleware/authMiddleware.js';
import {
  getCulturalContent,
  getCulturalContentById,
  createCulturalContent,
  updateCulturalContent,
  deleteCulturalContent,
} from '../controllers/cultureController.js';

const router = express.Router();

router.route('/')
  .get(getCulturalContent)
  .post(protect, admin, createCulturalContent);

router.route('/:id')
  .get(getCulturalContentById)
  .put(protect, admin, updateCulturalContent)
  .delete(protect, admin, deleteCulturalContent);

export default router;
