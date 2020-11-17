import { getType } from 'mime';
import { streamS3Object } from './S3Client';
import { isSupportedInputMime, createPipe } from './pipes';
import { getTransformer } from './Sharp';

export const handle = (
  event: any,
  context: any,
  cb: (err: any | null, response?: any) => void
) => {
  if (event.pathParameters == null || event.pathParameters.proxy == null) {
    return cb(null, { statusCode: 400 });
  }

  const key = event.pathParameters.proxy as string;
  const bucket = process.env.BUCKET!;
  const inputStream = streamS3Object(key, bucket, cb);
  const inputMime = getType(key);

  inputStream.once('readable', async () => {
    if (!isSupportedInputMime(inputMime)) {
      console.error(`Unsupported image ${key}`);

      // Not allow to read other files than images
      // return cb(null, { statusCode: 500 });

      const chunks: Array<Buffer> = [];
      inputStream.on('data', (chunk) => chunks.push(chunk as Buffer));
      inputStream.on('end', () => {
        const response = {
          statusCode: 200,
          headers: {
            'Content-Type': inputMime,
            'Cache-Control': 'public, max-age=31536000',
          },
          body: Buffer.concat(chunks).toString('base64'),
          isBase64Encoded: true,
        };

        return cb(null, response);
      });

      return;
    }

    const { transformer, mime } = createPipe(
      event.queryStringParameters || {},
      inputMime,
      getTransformer()
    );

    try {
      const image = await inputStream.pipe(transformer).toBuffer();

      const response = {
        statusCode: 200,
        headers: {
          'Content-Type': mime,
          'Cache-Control': 'public, max-age=31536000',
        },
        body: image.toString('base64'),
        isBase64Encoded: true,
      };

      cb(null, response);
    } catch (e) {
      console.error(`Exception while transforming ${key}`);
      console.error(e);
      cb(null, { statusCode: 500 });
    }
  });
};
