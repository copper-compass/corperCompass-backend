import { calculateBudget } from '../services/budgetService.js';

export const getBudgetEstimate = (req, res, next) => {
  try {
    const { rent, feeding, transport, miscellaneous } = req.body;
    const invalid = [rent, feeding, transport, miscellaneous].some(
      val => val !== undefined && typeof val !== 'number'
    );
    if (invalid) {
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
