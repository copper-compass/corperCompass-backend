import express from 'express';
import { protect, admin } from '../middleware/authMiddleware.js';
import * as areaController from '../controllers/areaController.js';
import * as lodgeController from '../controllers/lodgeController.js';
import * as cultureController from '../controllers/cultureController.js';

const router = express.Router();

router.use(protect, admin);

// Area management
router.route('/areas')
  .post(areaController.createArea);
router.route('/areas/:id')
  .put(areaController.updateArea)
  .delete(areaController.deleteArea);

// Lodge management
router.route('/lodges')
  .post(lodgeController.createLodge);
router.route('/lodges/:id')
  .put(lodgeController.updateLodge)
  .delete(lodgeController.deleteLodge);

// Cultural content management
router.route('/culture')
  .post(cultureController.createCulturalContent);
router.route('/culture/:id')
  .put(cultureController.updateCulturalContent)
  .delete(cultureController.deleteCulturalContent);

// Additional admin routes can be added here (e.g., user management)

export default router;
