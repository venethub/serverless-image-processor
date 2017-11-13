import { SharpInstance } from 'sharp';
import { resolve } from 'path';
import { isDevEnv } from './Utils';

export const getTransformer = (): SharpInstance => {
  if (!isDevEnv()) {
    return eval('require')('../compiled/sharp')();
  } else {
    return require('sharp')();
  }
};
