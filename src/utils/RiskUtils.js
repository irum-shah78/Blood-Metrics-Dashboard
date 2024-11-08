export const determineRiskLevel = (metric, value) => {
  const numValue = typeof value === 'string' ? parseInt(value.split('/')[0]) : value;
  if (metric === 'a1c') return numValue >= 6.5 ? 'high-risk' : numValue >= 5.7 ? 'borderline' : 'normal';
  if (metric === 'ldl') return numValue >= 160 ? 'high-risk' : numValue >= 130 ? 'borderline' : 'normal';
  if (metric === 'vitaminD') return numValue < 20 ? 'high-risk' : numValue <= 30 ? 'borderline' : 'normal';
  if (metric === 'bloodPressure') return numValue >= 140 ? 'high-risk' : numValue >= 130 ? 'borderline' : 'normal';
  if (metric === 'glucose') return numValue >= 126 ? 'high-risk' : numValue >= 100 ? 'borderline' : 'normal';
  return 'normal';
};

export const getColor = (riskLevel) => {
  return riskLevel === 'high-risk' ? 'bg-red-300' : riskLevel === 'borderline' ? 'bg-yellow-200' : '';
};
