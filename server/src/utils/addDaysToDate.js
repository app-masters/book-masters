import moment from 'moment';

export default function addDaysToDate(date, days) {
  const momentDate = moment(date);
  momentDate.add(days, 'days');
  return momentDate.toDate();
}
