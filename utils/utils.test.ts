import { describe, vi, it, expect } from 'vitest';
import { getWeekNumber, isLeapYear, getDayOfWeek, DaysOfWeek } from './utils';

describe('isLeapYear()', () => {
  it('should return true if the year is leap', () => {
    expect(isLeapYear(2020)).toBeTruthy();
  });

  it('should return false if the year is not leap', () => {
    expect(isLeapYear(2021)).not.toBeTruthy();
  });
});

describe('getWeekNumber', () => {
  it('should return 26 as week number for the 2 July 2022', () => {
    const dateToTest = new Date(2022, 6, 2);
    const weekNumber = getWeekNumber(dateToTest);
    expect(weekNumber).toBe(26);
  });

  it('should return 27 as week number for the 4 July 2022', () => {
    const dateToTest = new Date(2022, 6, 4);
    const weekNumber = getWeekNumber(dateToTest);
    expect(weekNumber).toBe(27);
  });

  it('should return 0 as week number for the 1 January 2022 because the first week does not started', () => {
    const dateToTest = new Date(2022, 0, 1);
    const weekNumber = getWeekNumber(dateToTest);
    expect(weekNumber).toBe(0);
  });

  it('should return 1 as week number for the 2 January 2022 because the first week of the year just started', () => {
    const dateToTest = new Date(2022, 0, 2);
    const weekNumber = getWeekNumber(dateToTest);
    expect(weekNumber).toBe(1);
  });
});

describe('getDayOfWeek', () => {
  it('throw an error if the first provided parameter is not a date', () => {
    const err = () => getDayOfWeek('something' as unknown as Date);
    expect(err).toThrow('Not a date');
  });

  it('throw an error if the second provided parameter is not week name', () => {
    const err = () => getDayOfWeek(new Date(), 'something');
    expect(err).toThrow('The provided day is not valid, chose one of them:\n ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", saturday]');
  });

  describe('with sunday has base Day', () => {
    it('should return 6 for 2 July 2022 (saturday)', () => {
      const dateToTest = new Date(2022, 6, 2);
      expect(getDayOfWeek(dateToTest)).toBe(6);
    });
    it('should return 0 for 3 July 2022 (sunday)', () => {
      const dateToTest = new Date(2022, 6, 3);
      expect(getDayOfWeek(dateToTest)).toBe(0);
    });
    it('should return 2 for 5 July 2022 (tuesday', () => {
      const dateToTest = new Date(2022, 6, 5);
      expect(getDayOfWeek(dateToTest)).toBe(2);
    });
  });

  describe('with monday has base Day', () => {
    it('should return 5 for 2 July 2022 (saturday)', () => {
      const dateToTest = new Date(2022, 6, 2);
      expect(getDayOfWeek(dateToTest, DaysOfWeek.MONDAY)).toBe(5);
    });
    it('should return 6 for 3 July 2022 (sunday)', () => {
      const dateToTest = new Date(2022, 6, 3);
      expect(getDayOfWeek(dateToTest, DaysOfWeek.MONDAY)).toBe(6);
    });
    it('should return 3 for 5 July 2022 (tuesday', () => {
      const dateToTest = new Date(2022, 6, 5);
      expect(getDayOfWeek(dateToTest, DaysOfWeek.MONDAY)).toBe(1);
    });
  });
});
