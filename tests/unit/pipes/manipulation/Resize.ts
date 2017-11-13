import { getTransformer } from '../../../../src/Sharp';
import { calculate, resize } from '../../../../src/pipes/manipulation/Resize';

describe('Resize.ts', () => {
  describe('calculate', () => {
    it('should return defaultDimensions for invalid params', () => {
      const defaultDimension = { width: 1920 };
      expect(calculate({ width: 'foo' })).toEqual(defaultDimension);
      expect(calculate({ height: 'foo' })).toEqual(defaultDimension);
      expect(calculate({})).toEqual(defaultDimension);
    });

    it('should return valid width and/or height', () => {
      expect(calculate({ height: '400', width: 'foo' })).toEqual({
        height: 400
      });

      expect(calculate({ height: 'foo', width: '500' })).toEqual({
        width: 500
      });

      expect(calculate({ width: '500' })).toEqual({
        width: 500
      });

      expect(calculate({ height: '500' })).toEqual({
        height: 500
      });

      expect(calculate({ height: '500', width: '300' })).toEqual({
        height: 500,
        width: 300
      });

      expect(calculate({ height: '6000' })).toEqual({
        height: 5000
      });

      expect(calculate({ width: '6000' })).toEqual({
        width: 5000
      });

      expect(calculate({ width: '6000', height: '400' })).toEqual({
        width: 5000,
        height: 400
      });

      expect(calculate({ width: '600', height: '6000' })).toEqual({
        width: 600,
        height: 5000
      });
    });
  });

  describe('resize', () => {
    let sharpInstance = getTransformer();
    let resizeMock: jest.Mock<any>;

    beforeEach(() => {
      resizeMock = jest.spyOn(sharpInstance, 'resize').mockReturnThis();
    });

    afterEach(() => resizeMock.mockReset());

    it('should', () => {
      expect(resize({ width: '400' }, sharpInstance)).toBe(sharpInstance);
      expect(resizeMock).toHaveBeenCalledWith(400, undefined);

      expect(resize({ width: '400', height: '200' }, sharpInstance)).toBe(
        sharpInstance
      );
      expect(resizeMock).toHaveBeenCalledWith(400, 200);

      expect(resize({ height: '200' }, sharpInstance)).toBe(sharpInstance);
      expect(resizeMock).toHaveBeenCalledWith(undefined, 200);
    });
  });
});
