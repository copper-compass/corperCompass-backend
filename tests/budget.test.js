import { calculateBudget } from '../backend/src/services/budgetService.js';

describe('Budget Calculator', () => {
  test('calculates total and buffer correctly', () => {
    const input = { rent: 50000, feeding: 20000, transport: 10000, miscellaneous: 5000 };
    const result = calculateBudget(input);
    expect(result.total).toBe(85000);
    expect(result.buffer).toBe(12750);
    expect(result.recommendedBudget).toBe(97750);
    expect(result.riskAlert).toBe(false);
  });

  test('triggers risk alert when total below threshold', () => {
    const input = { rent: 10000, feeding: 5000, transport: 2000, miscellaneous: 1000 };
    const result = calculateBudget(input);
    expect(result.riskAlert).toBe(true);
  });

  test('handles missing inputs', () => {
    const result = calculateBudget({ rent: 10000 });
    expect(result.total).toBe(10000);
    expect(result.buffer).toBe(1500);
    expect(result.recommendedBudget).toBe(11500);
  });
});
