import * as AWS from 'aws-sdk';
import { getS3ClientConfig, getBucketName } from './Utils';

export const streamS3Object = (
  key: string,
  cb: (err: any | null, response?: any) => void
) => {
  const s3Client = new AWS.S3(getS3ClientConfig());

  const bucket = getBucketName();
  const stream = s3Client
    .getObject({
      Key: key,
      Bucket: bucket
    })
    .createReadStream();

  stream.on('error', (e: Error) => {
    if (e.name === 'NoSuchKey') {
      return cb(null, { statusCode: 404 });
    }

    console.error(`error while fetching ${key}`);
    console.error(e);
    cb(null, { statusCode: 500 });
  });

  return stream;
};
