import express from 'express';
import { getMapMarkers, getHeatmapData } from '../controllers/mapController.js';

const router = express.Router();

router.get('/markers', getMapMarkers);
router.get('/heatmap', getHeatmapData);

export default router;
