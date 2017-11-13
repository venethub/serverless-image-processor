import { streamS3Object } from '../../src/S3Client';
import { Readable } from 'stream';

jasmine.DEFAULT_TIMEOUT_INTERVAL = 60000;

describe('S3Client', () => {
  it('should return 404 on missing object', done => {
    streamS3Object('foo.jpg', (err, response) => {
      expect(err).toBeFalsy();
      expect(response).toEqual({ statusCode: 404 });
      done();
    });
  });

  it('should return a stream (with data)', done => {
    const stream = streamS3Object('test.jpg', (err, response) => {});
    expect(stream).toBeInstanceOf(Readable);
    stream.on('data', () => done());
  });
});
