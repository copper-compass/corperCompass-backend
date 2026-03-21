export const calculateBudget = ({ rent = 0, feeding = 0, transport = 0, miscellaneous = 0 }) => {
  const total = rent + feeding + transport + miscellaneous;
  
  const buffer = total * 0.15;
  
  const recommendedBudget = total + buffer;
  
  const minimumThreshold = 50000; // example threshold, can be made configurable
  
  const riskAlert = total < minimumThreshold;
  
  return { total, buffer, recommendedBudget, riskAlert };
};
