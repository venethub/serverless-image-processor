import { isSupportedInputMime } from '../../../src/pipes/index';

describe('pipes', () => {
  describe('isSupportedInputMime', () => {
    it('should return true for supported mimes otherwise false', () => {
      expect(isSupportedInputMime(null)).toBeFalsy();
      expect(isSupportedInputMime('foo')).toBeFalsy();

      ['image/jpeg', 'image/gif', 'image/png'].forEach(mime =>
        expect(isSupportedInputMime(mime)).toBeTruthy()
      );
    });
  });
});
