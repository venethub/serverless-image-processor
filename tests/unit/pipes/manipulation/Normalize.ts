import { getTransformer } from '../../../../src/Sharp';
import { normalize } from '../../../../src/pipes/manipulation/Normalize';

describe('Normalize.ts', () => {
  let sharpInstance = getTransformer();
  let normalizeMock: jest.Mock<any>;

  beforeEach(() => {
    normalizeMock = jest.spyOn(sharpInstance, 'normalize').mockReturnThis();
  });

  afterEach(() => normalizeMock.mockReset());

  it('should not default normalize', () => {
    normalize({}, sharpInstance);
    expect(normalizeMock).not.toHaveBeenCalled();
  });

  it('should normalize', () => {
    normalize({ normalize: 'true' }, sharpInstance);
    expect(normalizeMock).toHaveBeenCalled();
  });
});
