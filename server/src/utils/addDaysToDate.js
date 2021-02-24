export default function addDaysToDate(date, days) {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}
