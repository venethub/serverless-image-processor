import { getTransformer } from '../../../../src/Sharp';
import { convert } from '../../../../src/pipes/conversion';

describe('Convert.ts', () => {
  let sharpInstance = getTransformer();
  let jpegMock: jest.Mock<any>;
  let pngMock: jest.Mock<any>;
  let webPMock: jest.Mock<any>;

  beforeEach(() => {
    jpegMock = jest.spyOn(sharpInstance, 'jpeg').mockReturnThis();
    pngMock = jest.spyOn(sharpInstance, 'png').mockReturnThis();
    webPMock = jest.spyOn(sharpInstance, 'webp').mockReturnThis();
  });

  afterEach(() => {
    jpegMock.mockReset();
    pngMock.mockReset();
    webPMock.mockReset();
  });

  it('image/gif -> image/jpeg', () => {
    expect(convert({}, 'image/gif', sharpInstance)).toMatchObject({
      mime: 'image/jpeg'
    });
    expect(jpegMock).toHaveBeenCalled();
    jpegMock.mockReset();

    expect(convert({ jpg: 'true' }, 'image/gif', sharpInstance)).toMatchObject({
      mime: 'image/jpeg'
    });
    expect(jpegMock).toHaveBeenCalled();
  });

  it('image/gif -> image/webp', () => {
    expect(
      convert({ webp: 'true' }, 'image/gif', sharpInstance)
    ).toMatchObject({
      mime: 'image/webp'
    });
    expect(webPMock).toHaveBeenCalled();
  });

  it('image/jpeg -> image/jpeg', () => {
    expect(convert({}, 'image/jpeg', sharpInstance)).toMatchObject({
      mime: 'image/jpeg'
    });
    expect(jpegMock).toHaveBeenCalled();
    jpegMock.mockReset();

    expect(
      convert({ jpg: 'true' }, 'image/jpeg', sharpInstance)
    ).toMatchObject({
      mime: 'image/jpeg'
    });
    expect(jpegMock).toHaveBeenCalled();
  });

  it('image/jpeg -> image/webp', () => {
    expect(
      convert({ webp: 'true' }, 'image/jpeg', sharpInstance)
    ).toMatchObject({
      mime: 'image/webp'
    });
    expect(webPMock).toHaveBeenCalled();
  });

  it('image/png -> image/png', () => {
    expect(convert({}, 'image/png', sharpInstance)).toMatchObject({
      mime: 'image/png'
    });
    expect(pngMock).toHaveBeenCalled();
  });

  it('image/png -> image/jpeg', () => {
    expect(convert({ jpg: 'true' }, 'image/png', sharpInstance)).toMatchObject({
      mime: 'image/jpeg'
    });
    expect(jpegMock).toHaveBeenCalled();
  });

  it('image/png -> image/webp', () => {
    expect(
      convert({ webp: 'true' }, 'image/png', sharpInstance)
    ).toMatchObject({
      mime: 'image/webp'
    });
    expect(webPMock).toHaveBeenCalled();
  });
});
