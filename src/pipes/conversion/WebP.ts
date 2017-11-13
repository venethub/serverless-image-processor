import { SharpInstance } from 'sharp';
import { InputQueryParams } from '../../QueryParams';
import { toInt } from '../../Utils';

const defaultWebPSettings = {
  quality: 75
};

export const webP = (
  queryParams: InputQueryParams,
  transformer: SharpInstance
) =>
  transformer.webp({
    quality: toInt(queryParams.quality, defaultWebPSettings.quality)
  });
