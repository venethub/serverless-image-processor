import { getTransformer } from '../../../../src/Sharp';
import { jpeg } from '../../../../src/pipes/conversion/Jpeg';

describe('Jpeg.ts', () => {
  let sharpInstance = getTransformer();
  let jpegMock: jest.Mock<any>;

  beforeEach(() => {
    jpegMock = jest.spyOn(sharpInstance, 'jpeg').mockReturnThis();
  });

  afterEach(() => jpegMock.mockReset());

  it('should pass default params', () => {
    expect(jpeg({}, sharpInstance)).toBe(sharpInstance);
    expect(jpegMock).toHaveBeenCalledWith({ progressive: true, quality: 75 });
  });

  it('should pass quality param', () => {
    jpeg({ quality: '40' }, sharpInstance);
    expect(jpegMock).toHaveBeenCalledWith({
      quality: 40,
      progressive: true
    });
  });

  it('should pass progressive param', () => {
    jpeg({ progressive: 'false' }, sharpInstance);
    expect(jpegMock).toHaveBeenCalledWith({
      quality: 75,
      progressive: false
    });
  });

  it('should pass both params', () => {
    jpeg({ quality: '60', progressive: 'false' }, sharpInstance);
    expect(jpegMock).toHaveBeenCalledWith({
      quality: 60,
      progressive: false
    });
  });
});
