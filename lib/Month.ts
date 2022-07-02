// maybe change the import to relative path
import { MONTHS_SIZE, isLeapYear, DaysOfWeek } from '../utils/utils';
import Day from './Day';

export default class Month {
  lang: string;
  name: string;
  number: number;
  year: number;
  numberOfDays: number;
  startDayOfWeek: DaysOfWeek;

  constructor(date: Date | null = null, lang: string = 'default', startDayOfWeek: DaysOfWeek = DaysOfWeek.SUNDAY) {
    const day = new Day(date, lang, startDayOfWeek);
    const monthsSize = MONTHS_SIZE;

    this.lang = lang;
    this.name = day.month;
    this.number = day.monthNumber;
    this.year = day.year;
    this.numberOfDays = monthsSize[this.number - 1];
    this.startDayOfWeek = startDayOfWeek;

    // It means February
    if (this.number === 2) {
      this.numberOfDays += isLeapYear(day.year) ? 1 : 0;
    }
  }

  *[Symbol.iterator]() {
    let number = 1;
    yield this.getDay(number);
    while (number < this.numberOfDays) {
      ++number;
      yield this.getDay(number);
    }
  }

  getDay(date: number) {
    return new Day(new Date(this.year, this.number - 1, date), this.lang, this.startDayOfWeek);
  }
}
