import { getTransformer } from '../../../../src/Sharp';
import { webP } from '../../../../src/pipes/conversion/WebP';

describe('Png.ts', () => {
  let sharpInstance = getTransformer();
  let webPMock: jest.Mock<any>;

  beforeEach(() => {
    webPMock = jest.spyOn(sharpInstance, 'webp').mockReturnThis();
  });

  afterEach(() => webPMock.mockReset());

  it('should pass default params', () => {
    expect(webP({}, sharpInstance)).toBe(sharpInstance);
    expect(webPMock).toHaveBeenCalledWith({
      quality: 75
    });
  });

  it('should pass quality param', () => {
    webP({ quality: '60' }, sharpInstance);
    expect(webPMock).toHaveBeenCalledWith({
      quality: 60
    });
  });
});
