import { describe, it, expect, vi, beforeEach } from 'vitest';

import { DaysOfWeek } from '../utils/utils';
import Day from './Day';
import Month from './Month';
import Year from './Year';

describe('class Year', () => {
  let year: Year;

  beforeEach(() => {
    year = new Year();
  });

  describe('class instanciation', () => {
    it('should throw an error if the year provided is not a number', () => {
      const yearFnThrow = () => new Year('2022' as any);
      expect(yearFnThrow).toThrow('The year must be a number');
    });

    it('should throw an error if the month provided is not a number', () => {
      const monthFnThrow = () => new Year(2022, '2' as any);
      expect(monthFnThrow).toThrow('The month must be a number');
    });

    it('should instanciate today & month', () => {
      expect(year.today).toBeInstanceOf(Day);
      expect(year.month).toBeInstanceOf(Month);
    });

    it('should have sunday as first day of the week in weekDays if created with sunday as startDay', () => {
      const year = new Year(2022, 7, 'en', DaysOfWeek.SUNDAY);
      expect(year.weekDays.at(0)).toBe('Sunday');
    });

    it('should have monday as first day of the week in weekDays if created with monday as startDay', () => {
      const year = new Year(2022, 7, 'en', DaysOfWeek.MONDAY);
      expect(year.weekDays.at(0)).toBe('Monday');
    });
  });

  describe('Symbol.iterator', () => {
    it('should have a lenght of 12 of the 12 months of the year', () => {
      expect([...year].length).toBe(12);
    });

    it('should have january as first month', () => {
      const year = new Year(2022, 7, 'en', DaysOfWeek.MONDAY);
      expect([...year].at(0)?.name).toBe('January');
    });
  });
});
