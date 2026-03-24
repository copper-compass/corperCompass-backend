import { calculateBudget } from '../services/budgetService.js';

export const getBudgetEstimate = (req, res, next) => {
  try {
    const { accommodation, food, transport, other } = req.body;
    const invalid = [accommodation, food, transport, other].some(
      val => val !== undefined && typeof val !== 'number'
    );
    if (invalid) {
      res.status(400);
      throw new Error('All inputs must be numbers');
    }
    const result = calculateBudget({
      rent: accommodation || 0,
      feeding: food || 0,
      transport: transport || 0,
      miscellaneous: other || 0,
    });
    res.json(result);
  } catch (error) {
    next(error);
  }
};
