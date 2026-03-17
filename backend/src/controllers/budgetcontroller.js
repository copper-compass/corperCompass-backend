import { calculateBudget } from '../services/budgetService.js';

// @desc    Calculate relocation budget
// @route   POST /api/budget
export const getBudgetEstimate = (req, res, next) => {
  try {
    const { rent, feeding, transport, miscellaneous } = req.body;
    // Validate inputs
    if ([rent, feeding, transport, miscellaneous].some(val => val !== undefined && typeof val !== 'number')) {
      res.status(400);
      throw new Error('All inputs must be numbers');
    }
    const result = calculateBudget({
      rent: rent || 0,
      feeding: feeding || 0,
      transport: transport || 0,
      miscellaneous: miscellaneous || 0,
    });
    res.json(result);
  } catch (error) {
    next(error);
  }
};
