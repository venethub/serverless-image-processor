import { getTransformer } from '../../../../src/Sharp';
import { png } from '../../../../src/pipes/conversion/Png';

describe('Png.ts', () => {
  let sharpInstance = getTransformer();
  let pngMock: jest.Mock<any>;

  beforeEach(() => {
    pngMock = jest.spyOn(sharpInstance, 'png').mockReturnThis();
  });

  afterEach(() => pngMock.mockReset());

  it('should pass default params', () => {
    expect(png({}, sharpInstance)).toBe(sharpInstance);
    expect(pngMock).toHaveBeenCalledWith({ progressive: true });
  });

  it('should pass progressive param', () => {
    png({ progressive: 'false' }, sharpInstance);
    expect(pngMock).toHaveBeenCalledWith({
      progressive: false
    });
  });
});
