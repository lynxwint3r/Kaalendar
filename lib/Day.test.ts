import { describe, it, expect, vi, beforeEach, beforeAll } from 'vitest';
import Day from './Day';

// vi.mock('./Day')

// const resetDatasMock = vi.fn();
// const getSpecificDataMock = vi.fn();
// const setSpecificDataMock = vi.fn();

// vi.mock('./Day', () => ({
//   default: vi.fn(() => ({
//     resetDatas: resetDatasMock,
//     getSpecificData: getSpecificDataMock,
//     setSpecificData: setSpecificDataMock,
//   })),
// }));

describe('Day class', () => {
  let day: Day;

  describe('class instanciation', () => {
    beforeAll(() => {
      day = new Day(new Date(2022, 6, 2));
    });

    it('should have been defined', () => {
      expect(day).toBeDefined();
    });
  });

  describe('getter/setter data', () => {
    beforeEach(() => {
      day = new Day();
      day.data = {};
    });

    it('should get an empty object', () => {
      const data = day.data
      expect(data).toEqual({});
    });

    it('should call the setter with the right argument', () => {
      const spyDataSet = vi.spyOn(day, 'data', 'set');
      const dataToSet = { name: 'a dumb name' };
      day.data = dataToSet;
      expect(spyDataSet).toHaveBeenCalledWith(dataToSet);
    });

    it('should set the data properly', () => {
      const dataToSet = { name: 'a dumb name' };
      day.data = dataToSet;
      expect(day.data).toEqual(dataToSet);
    });
  });

  describe('getSpecificData()', () => {
    let nameData = 'a dumby name';
    beforeAll(() => {
      day = new Day();
      day.data = {name: nameData}
    });

    it('should return the data from the right key', () => {
      const searchedData = day.getSpecificData('name');
      expect(searchedData).toBe(nameData + '');
    });
  });

  describe('setSpecificData()', () => {
    beforeAll(() => {
        day = new Day()
    })

    it('should call the callback', () => {
        const key = 'keyName';
        const callback = vi.fn()
        day.setSpecificData(key, callback)
        expect(callback).toHaveBeenCalledOnce();
    })

    it('should call the callback with data & false', () => {
        const key = 'keyName';
        const callback = vi.fn()
        day.setSpecificData(key, callback)
        expect(callback).toBeCalledWith(day.data, false);
    })

    it('should call the callback with data & true', () => {
        const key = 'name';
        day.data = {name: 'a name'}
        const callback = vi.fn()
        day.setSpecificData(key, callback)
        expect(callback).toBeCalledWith(day.data, true);
    })

    it('should set the data properly', () => {
        const key = 'name';
        const data = {name: 'a name'}
        const newNameData = 'a new name'
        day.data = data
        expect(day.data).toEqual(data)
        const callback = (data: any, found: any) => data.name = newNameData
        day.setSpecificData(key, callback)
        expect(day.data).toEqual({name: newNameData})
    })
  });

  describe('resetData()', () => {
    it('should reset the data field to an empty oject', () => {
        const day = new Day()
        const nameData = {name: 'a name'}
        const presentData = {present: 'is not present'}
        day.data = nameData
        day.data = presentData
        expect(day.data).toEqual({...nameData, ...presentData})
        day.resetDatas()
        expect(day.data).toEqual({})
    })
  })

  describe('isEqualTo()', () => {
    it('should not be equal for a past date and today', () => {
        const today = new Day()
        const firstOfCentuary = new Date(2000, 0, 1)
        const isEqual = today.isEqualTo(firstOfCentuary)
        expect(isEqual).toBe(false)
    })
    it('should be equal for 2 past days', () => {
        const firstOfCentuary = new Date(2000, 0, 1)
        const firstOfCentuaryAsDay = new Day(firstOfCentuary)
        const isEqual = firstOfCentuaryAsDay.isEqualTo(firstOfCentuary)
        expect(isEqual).toBe(true)
    })
    
  })

  describe('get isToday', () => {
    it('should return true if the current Day is today', () => {
        const today = new Day();
        expect(today.isToday).toBe(true)
    })
  })

  // describe('format()')
});
