import { getType } from 'mime';
import { streamS3Object } from './S3Client';
import { isSupportedInputMime, createPipe } from './pipes';
import { getTransformer } from './Sharp';

export const process = (
  event: any,
  context: any,
  cb: (err: any | null, response?: any) => void
) => {
  if (event.pathParameters == null) {
    return cb(null, { statusCode: 400 });
  }

  const key = event.pathParameters.proxy as string;
  const inputStream = streamS3Object(key, cb);
  const inputMime = getType(key);

  inputStream.once('readable', async () => {
    if (!isSupportedInputMime(inputMime)) {
      console.error(`Unsupported image ${key}`);
      return cb(null, { statusCode: 500 });
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
          'Content-Type': mime
        },
        body: image.toString('base64'),
        isBase64Encoded: true
      };

      cb(null, response);
    } catch (e) {
      console.error(`Exception while transforming ${key}`);
      console.error(e);
      cb(null, { statusCode: 500 });
    }
  });
};
