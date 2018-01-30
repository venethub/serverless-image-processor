import { getTransformer } from '../../../../src/Sharp';
import { withoutEnlargement } from '../../../../src/pipes/manipulation/WithoutEnlargement';

describe('Normalize.ts', () => {
  let sharpInstance = getTransformer();
  let withoutEnlargementMock: jest.Mock<any>;

  beforeEach(() => {
    withoutEnlargementMock = jest
      .spyOn(sharpInstance, 'withoutEnlargement')
      .mockReturnThis();
  });

  afterEach(() => withoutEnlargementMock.mockReset());

  it('should default to withoutEnlargement', () => {
    withoutEnlargement({}, sharpInstance);
    expect(withoutEnlargementMock).toHaveBeenCalled();
  });

  it('should withoutEnlargement', () => {
    withoutEnlargement({ withoutEnlargement: 'true' }, sharpInstance);
    expect(withoutEnlargementMock).toHaveBeenCalled();
  });

  it('should withoutEnlargement', () => {
    withoutEnlargement({ withoutEnlargement: 'false' }, sharpInstance);
    expect(withoutEnlargementMock).not.toHaveBeenCalled();
  });
});
