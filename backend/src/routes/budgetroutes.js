import express from 'express';
import { getBudgetEstimate } from '../controllers/budgetController.js';

const router = express.Router();

router.post('/', getBudgetEstimate);

export default router;
