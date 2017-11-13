import { toBoolean, toInt } from '../../src/Utils';

describe('Utils.ts', () => {
  describe('toBoolean', () => {
    it('should return the default for null and undefined', () => {
      expect(toBoolean(null, true)).toBeTruthy();
      expect(toBoolean(null, false)).toBeFalsy();
      expect(toBoolean(undefined, true)).toBeTruthy();
      expect(toBoolean(undefined, false)).toBeFalsy();
    });

    it('should convert boolean strings', () => {
      expect(toBoolean('false', true)).toBeFalsy();
      expect(toBoolean('true', false)).toBeTruthy();
      expect(toBoolean('foo', true)).toBeTruthy();
      expect(toBoolean('foo', false)).toBeFalsy();
    });
  });

  describe('toInt', () => {
    it('should return default for null and undefined', () => {
      expect(toInt(null, 5)).toBe(5);
      expect(toInt(undefined, 5)).toBe(5);
    });

    it('should parse string to int', () => {
      expect(toInt('5', 10)).toBe(5);
      expect(toInt('10.5', 5)).toBe(10);
      expect(toInt('foo', 5)).toBe(5);
    });
  });
});
