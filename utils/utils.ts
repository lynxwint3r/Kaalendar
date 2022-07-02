export enum DaysOfWeek {
  SUNDAY = 'sunday',
  MONDAY = 'monday',
  TUESDAY = 'tuesday',
  WEDNESDAY = 'wednesday',
  THURSDAY = 'thursday',
  FRIDAY = 'friday',
  SATURDAY = 'saturday',
}

export const MONTHS_SIZE = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

/**
 *
 * @param {Number} year
 * @returns {boolean} Is the year leap or not
 */
export function isLeapYear(year: number) {
  return year % 100 === 0 ? year % 400 === 0 : year % 4 === 0;
}

/**
 *
 * @param {Date} date - The date from which search the week number
 * @returns {Number} The number of the week
 */
export function getWeekNumber(date: Date) {
  const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
  const pastDaysOfYear = Math.floor((+date - +firstDayOfYear) / (1000 * 60 * 60 * 24));

  return Math.ceil(pastDaysOfYear / 7);
}

export function getDayOfWeek(date: Date | undefined, firstDay = 'sunday') {
  if (!(date instanceof Date)) throw new Error('Not a date');

  const daysOfWeek: { [key: string]: number } = {
    sunday: 0,
    monday: 1,
    tuesday: 2,
    wednesday: 3,
    thursday: 4,
    friday: 5,
    saturday: 6,
  };

  if (!(firstDay in daysOfWeek))
    throw new Error(
      'The provided day is not valid, chose one of them:\n ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", saturday]'
    );

  const day = date.getDay() - daysOfWeek[firstDay];
  return day < 0 ? day + 7 : day;
}
