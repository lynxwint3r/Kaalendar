import { DaysOfWeek, getDayOfWeek, getWeekNumber } from '../utils/utils';

export interface DayOptions {
    activated?: boolean
}

export type data = {
    [key: string | number | symbol]: any
}

type SpecificDataCallback = (data: data, keyFound: boolean) => void

export default class Day {
  Date: Date;
  date: number;
  day: string;
  dayNumber: number;
  dayShort: string;
  year: number;
  yearShort: number;
  month: string;
  monthShort: string;
  monthNumber: number;
  timestamp: number;
  week: number;
  private _data: data = {};
  activated = true;

  constructor(
    date: Date | null = null,
    lang: string = 'default',
    startDayOfWeek: DaysOfWeek = DaysOfWeek.SUNDAY,
    options: DayOptions = {}
  ) {
    date = date ?? new Date();

    this.Date = date;
    this.date = date.getDate();
    this.day = date.toLocaleString(lang, { weekday: 'long' });
    // this.dayNumber = date.getDay() + 1
    this.dayNumber = getDayOfWeek(this.Date, startDayOfWeek);
    this.dayShort = date.toLocaleString(lang, { weekday: 'short' });
    this.year = date.getFullYear();
    this.yearShort = +date.toLocaleString(lang, { year: '2-digit' });
    this.month = date.toLocaleString(lang, { month: 'long' });
    this.monthShort = date.toLocaleString(lang, { month: 'short' });
    this.monthNumber = +date.toLocaleString(lang, { month: '2-digit' });
    this.timestamp = date.getTime();
    this.week = getWeekNumber(date);

    if (options.activated) this.activated = options.activated;
  }

  get data() {
    return this._data;
  }

  getSpecificData(key: any) {
    return this._data[key] || null;
  }

  set data(datas) {
    this._data = { ...this._data, ...datas };
  }

  setSpecificData(key: any, applyOnData: SpecificDataCallback): void {
    const data = this._data;

    const hasKey = key in data;

    if (hasKey) applyOnData(data, true);
    else applyOnData(data, false);
  }

  resetDatas(): void {
    this._data = {};
  }

  get isToday() {
    return this.isEqualTo(new Date());
  }

  isEqualTo(date: Day | Date) {
    date = date instanceof Day ? date.Date : date;

    return date.getDate() === this.date && date.getMonth() === this.monthNumber - 1 && date.getFullYear() === this.year;
  }

  format(formatStr: string) {
    return formatStr
      .replace(/\bYYYY\b/, this.year.toString())
      .replace(/\bYY\b/, this.yearShort.toString())
      .replace(/\bWW\b/, this.week.toString().padStart(2, '0'))
      .replace(/\bW\b/, this.week.toString())
      .replace(/\bDDDD\b/, this.day)
      .replace(/\bDDD\b/, this.dayShort)
      .replace(/\bDD\b/, this.date.toString().padStart(2, '0'))
      .replace(/\bDO\b/, this.date.toString() + 'th')
      .replace(/\bD\b/, this.date.toString())
      .replace(/\bMMMM\b/, this.month)
      .replace(/\bMMM\b/, this.monthShort)
      .replace(/\bMM\b/, this.monthNumber.toString().padStart(2, '0'))
      .replace(/\bM\b/, this.monthNumber.toString());
  }
}

// const day = new Day(new Date(2022, 2, 20))

// console.log(day)
