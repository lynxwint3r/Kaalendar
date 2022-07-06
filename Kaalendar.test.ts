import Kaalendar from './Kaalendar';
import { beforeEach, describe, it, expect, vi } from 'vitest';
import { DaysOfWeek } from './utils/utils';
import Month from './lib/Month';
import Day from './lib/Day';

describe('Kaalendar main component of the package/entrypoint', () => {
  let kaalendar: Kaalendar;

  beforeEach(() => {
    kaalendar = new Kaalendar(2022, 7, 'en');
  });

  describe('class instanciation', () => {
    it('should instanciate with default options', () => {
      expect(kaalendar.generateASingleArray).toBe(true);
      expect(kaalendar.generateOnlyDaysOfCurrentMonth).toBe(false);
    });

    it('should have the option `generateAsingleArray` as false', () => {
      let kaalendar = new Kaalendar(null, null, 'en', DaysOfWeek.SUNDAY, {
        generateASingleArray: false,
      });
      expect(kaalendar.generateASingleArray).toBe(false);
    });

    it('should have the option `generateOnlyDaysOfCurrentMonth` as true', () => {
      let kaalendar = new Kaalendar(null, null, 'en', DaysOfWeek.SUNDAY, {
        generateOnlyDaysOfCurrentMonth: true,
      });
      expect(kaalendar.generateOnlyDaysOfCurrentMonth).toBe(true);
    });
  });

  describe('getPreviousMonth()', () => {
    it('should return the previous month', () => {
      const previousMonth = new Month(new Date(2022, 5), 'en');
      expect(kaalendar.getPreviousMonth()).toEqual(previousMonth);
    });

    it('should return the last month of the previous year if current month is january', () => {
      kaalendar = new Kaalendar(2022, 1, 'en');
      const previousMonth = new Month(new Date(2021, 11), 'en');
      expect(kaalendar.getPreviousMonth()).toEqual(previousMonth);
    });
  });

  describe('getNextMonth()', () => {
    it('should return the next month', () => {
      const nextMonth = new Month(new Date(2022, 7), 'en');
      expect(kaalendar.getNextMonth()).toEqual(nextMonth);
    });

    it('should return the first month of the next year if current month is december', () => {
      kaalendar = new Kaalendar(2021, 12, 'en');
      const nextMonth = new Month(new Date(2022, 0), 'en');
      expect(kaalendar.getNextMonth()).toEqual(nextMonth);
    });
  });

  describe('gotToDate()', () => {
    it('should move the calendar to the specified date', () => {
      const goToYear = 2023;
      const goToMonth = 9;
      kaalendar.goToDate(goToYear, goToMonth);
      expect(kaalendar.year).toBe(goToYear);
      expect(kaalendar.month.number).toBe(goToMonth);
    });
  });

  describe('goToNextYear()', () => {
    let yearToGo = 2023;
    let monthToGo = new Month(new Date(2023, 0), 'en');
    it('should go to the next year', () => {
      kaalendar.goToNextYear();
      expect(kaalendar.year).toEqual(yearToGo);
      expect(kaalendar.month).toEqual(monthToGo);
    });
  });

  describe('goToPreviousYear()', () => {
    let yearToGo = 2021;
    let monthToGo = new Month(new Date(2021, 11), 'en');
    it('should go to the previous year', () => {
      kaalendar.goToPreviousYear();
      expect(kaalendar.year).toEqual(yearToGo);
      expect(kaalendar.month).toEqual(monthToGo);
    });
  });

  describe('goToNextMonth()', () => {
    it('should go to the next month', () => {
      const nextMonth = new Month(new Date(2022, 7), 'en');
      kaalendar.goToNextMonth();
      expect(kaalendar.month).toEqual(nextMonth);
    });

    it('should go to the first month of the next year if current month is december', () => {
      let kaalendar = new Kaalendar(2021, 12, 'en');
      const nextMonth = new Month(new Date(2022, 0), 'en');
      kaalendar.goToNextMonth();
      expect(kaalendar.month).toEqual(nextMonth);
    });
  });

  describe('goToPreviousMonth()', () => {
    it('should go to the previous month', () => {
      const previousMonth = new Month(new Date(2022, 5), 'en');
      kaalendar.goToPreviousMonth();
      expect(kaalendar.month).toEqual(previousMonth);
    });

    it('should go to the last month of the previous year if current month is january', () => {
      let kaalendar = new Kaalendar(2022, 1, 'en');
      const previousMonth = new Month(new Date(2021, 11), 'en');
      kaalendar.goToPreviousMonth();
      expect(kaalendar.month).toEqual(previousMonth);
    });
  });

  describe('generateDaysBeforeAndAfter()', () => {
    const kaalendar = new Kaalendar(2022, 7, 'en', DaysOfWeek.SUNDAY, { generateOnlyDaysOfCurrentMonth: true });
    const dayNumberOfFirstDayOfMonth = kaalendar.month.getDay(1).dayNumber;
    const dayNumberOfLastDayOfMonth = kaalendar.month.getDay(kaalendar.month.numberOfDays).dayNumber;
    const previousMonthDays = [...kaalendar.getPreviousMonth()];
    const nextMonthDays = [...kaalendar.getNextMonth()];

    it('should return undefined for the previous & next days of current month if the option is activated', () => {
      const [daysBeforeCurrentMonth, daysAfterCurrentMonth] = kaalendar.generateDaysBeforeAndAfter(
        previousMonthDays,
        nextMonthDays,
        [dayNumberOfFirstDayOfMonth, dayNumberOfLastDayOfMonth]
      );
      for (const day of daysBeforeCurrentMonth) {
        expect(day).toBe(undefined);
      }
      for (const day of daysAfterCurrentMonth) {
        expect(day).toBe(undefined);
      }
    });

    it('should return `instanceof Day` for the previous & next days of current month if the option is disabled', () => {
      kaalendar.generateOnlyDaysOfCurrentMonth = false;
      const [daysBeforeCurrentMonth, daysAfterCurrentMonth] = kaalendar.generateDaysBeforeAndAfter(
        previousMonthDays,
        nextMonthDays,
        [dayNumberOfFirstDayOfMonth, dayNumberOfLastDayOfMonth]
      );
      for (const day of daysBeforeCurrentMonth) {
        expect(day).toBeInstanceOf(Day);
      }
      for (const day of daysAfterCurrentMonth) {
        expect(day).toBeInstanceOf(Day);
      }
    });
  });

  describe('singleArrayGeneration()', () => {
    const kaalendar = new Kaalendar(2022, 7, 'en', DaysOfWeek.SUNDAY, { generateOnlyDaysOfCurrentMonth: true });
    const dayNumberOfFirstDayOfMonth = kaalendar.month.getDay(1).dayNumber;
    const dayNumberOfLastDayOfMonth = kaalendar.month.getDay(kaalendar.month.numberOfDays).dayNumber;
    const previousMonthDays = [...kaalendar.getPreviousMonth()];
    const nextMonthDays = [...kaalendar.getNextMonth()];
    const [daysBeforeCurrentMonth, daysAfterCurrentMonth] = kaalendar.generateDaysBeforeAndAfter(
      previousMonthDays,
      nextMonthDays,
      [dayNumberOfFirstDayOfMonth, dayNumberOfLastDayOfMonth]
    );

    it('should render a single array with a length of -> previousDays + days + nextDays', () => {
      const singleArraygenerated = kaalendar.singleArrayGeneration();
      const firstDays = singleArraygenerated.splice(0, dayNumberOfFirstDayOfMonth);
      const middleDays = singleArraygenerated.splice(0, kaalendar.month.numberOfDays);
      const endDays = singleArraygenerated;
      expect(firstDays).toEqual(daysBeforeCurrentMonth);
      expect(middleDays).toEqual([...kaalendar.month]);
      expect(endDays).toEqual(daysAfterCurrentMonth);
    });
  });

  describe('doubleArrayGeneration()', () => {
    const kaalendar = new Kaalendar(2022, 7, 'en', DaysOfWeek.SUNDAY, { generateASingleArray: false });
    const doubleArrayGenerated = kaalendar.doubleArrayGeneration();
    it('should render an array with a line length of 7', () => {
      const arrayLine = doubleArrayGenerated[0];
      expect(arrayLine.length).toBe(7);
    });
  });

  describe('generateArray()', () => {
    it('should call singleArrayGeneration method if the option `generateASingleArray` is activated', () => {
      const kaalendar = new Kaalendar(2022, 7, 'en', DaysOfWeek.SUNDAY, { generateASingleArray: true });
      const spySingleArrayGeneration = vi.spyOn(kaalendar, 'singleArrayGeneration')
      kaalendar.generateArray()
      expect(spySingleArrayGeneration).toHaveBeenCalled()
    })

    it('should call doubleArrayGeneration method if the option `generateASingleArray` is not activated', () => {
      const kaalendar = new Kaalendar(2022, 7, 'en', DaysOfWeek.SUNDAY, { generateASingleArray: false });
      const spyDoubleArrayGeneration = vi.spyOn(kaalendar, 'doubleArrayGeneration')
      kaalendar.generateArray()
      expect(spyDoubleArrayGeneration).toHaveBeenCalled()
    })
  })
});
