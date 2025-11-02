export const getTemperatureTrends = (forecast) => {
  if (!forecast) return [];
  const days = forecast.forecastday || forecast.forecast?.forecastday;
  if (!Array.isArray(days)) return [];
  return days.map((day) => ({
    date: day.date,
    temp_max: day.day.maxtemp_c,
    temp_min: day.day.mintemp_c,
  }));
};
