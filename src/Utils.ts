export const toInt = (s: string | null | undefined, d: number) => {
  if (s == null) {
    return d;
  }

  const integer = parseInt(s);

  if (!isNaN(integer)) {
    return integer;
  }

  return d;
};

export const toBoolean = (s: string | null | undefined, d: boolean = false) => {
  if (s == null) {
    return d;
  }

  if (s === 'true') {
    return true;
  } else if (s === 'false') {
    return false;
  } else {
    return d;
  }
};

export const isDevEnv = () =>
  process.env.IS_OFFLINE != null || process.env.NODE_ENV === 'test';

export const getS3ClientConfig = () =>
  isDevEnv()
    ? {
        s3ForcePathStyle: true,
        endpoint: 'http://localhost:5445'
      }
    : {};

export const getBucketName = () =>
  !isDevEnv() ? process.env.BUCKET! : 'examples';
