import moment from 'moment';

export default function addDaysToDate(date, days) {
  const momentDate = date ? moment(date) : moment();
  if (days > 0) {
    momentDate.add(days, 'days');
  } else {
    momentDate.subtract(Math.abs(days), 'days');
  }
  return momentDate;
}
