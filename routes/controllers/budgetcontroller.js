const calculateBudget = (req, res) => {
  const { rent, feeding, transport, miscellaneous } = req.body;
  const total = rent + feeding + transport + miscellaneous;
  const buffer = total * 0.15;
  const recommended = total + buffer;
  const riskAlert = total < 50000 ? 'Your budget seems low for a comfortable stay. Consider increasing.' : null;
  res.json({
    total,
    buffer,
    recommended,
    riskAlert
  });
};

module.exports = { calculateBudget };
