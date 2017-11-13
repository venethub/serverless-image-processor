import { getTransformer } from '../../../../src/Sharp';
import { blur } from '../../../../src/pipes/manipulation/Blur';

describe('Blur.ts', () => {
  let sharpInstance = getTransformer();
  let blurMock: jest.Mock<any>;

  beforeEach(() => {
    blurMock = jest.spyOn(sharpInstance, 'blur').mockReturnThis();
  });

  afterEach(() => blurMock.mockReset());

  it('should default to non blur', () => {
    blur({}, sharpInstance);
    expect(blurMock).not.toHaveBeenCalled();
  });

  it('should blur', () => {
    blur({ blur: '0.2' }, sharpInstance);
    expect(blurMock).not.toHaveBeenCalled();
    blurMock.mockReset();

    blur({ blur: '0.5' }, sharpInstance);
    expect(blurMock).toHaveBeenCalled();
    blurMock.mockReset();

    blur({ blur: '100' }, sharpInstance);
    expect(blurMock).toHaveBeenCalled();
    blurMock.mockReset();

    blur({ blur: '101' }, sharpInstance);
    expect(blurMock).not.toHaveBeenCalled();
    blurMock.mockReset();

    blur({ blur: 'foo' }, sharpInstance);
    expect(blurMock).not.toHaveBeenCalled();
    blurMock.mockReset();
  });
});
