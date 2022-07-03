import { describe, it, vi, expect, beforeAll, beforeEach } from 'vitest';

import Month from './Month';
import { MONTHS_SIZE } from '../utils/utils';

describe('class Month', () => {
  let month: Month;

  beforeEach(() => {
    month = new Month();
  });

  describe('class Month instanciation', () => {
    it('should be defined', () => {
      expect(month).toBeDefined();
    });

    it('should have the correct day lenght for no leap february', () => {
      const date = new Date(2022, 1, 1);
      const februaryNotLeap = new Month(date);
      expect(februaryNotLeap.numberOfDays).toBe(28);
    });

    it('should have the correct day lenght for leap february', () => {
      const date = new Date(2020, 1, 1);
      const februaryNotLeap = new Month(date);
      expect(februaryNotLeap.numberOfDays).toBe(29);
    });
  });

  describe('Symbol.iterator()', () => {
    it('should return all days for the current month', () => {
      expect([...month].length).toBe(MONTHS_SIZE[month.number - 1]);
    });

    it('should return 29 days for the leap february', () => {
      let month = new Month(new Date(2020, 1));
      expect([...month].length).toBe(MONTHS_SIZE[month.number - 1] + 1);
    });
  });
});
