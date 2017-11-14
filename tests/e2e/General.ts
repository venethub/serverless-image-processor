import axios from 'axios';

jasmine.DEFAULT_TIMEOUT_INTERVAL = 60000;

describe('Lambda', () => {
  it('should return 400 for invalid queries', async () => {
    try {
      await axios.get('http://localhost:3000/');
    } catch (e) {
      expect(e.response.status).toBe(400);
    }
  });

  it('should return 404 for missing keys', async () => {
    try {
      await axios.get('http://localhost:3000/foo.jpg');
    } catch (e) {
      expect(e.response.status).toBe(404);
    }
  });
});
