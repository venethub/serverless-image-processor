import { curry } from 'ramda';
import { SharpInstance } from 'sharp';
import { InputQueryParams } from '../../QueryParams';

export const resize = curry(
  (queryParams: InputQueryParams, transformer: SharpInstance) => {
    const { width, height } = calculate(queryParams);
    return transformer.resize(width, height);
  }
);

export interface Dimension {
  width?: number;
  height?: number;
}

const defaultDimension = { width: 1920 };
const maxPx = 5000;

export const calculate = (queryParams: InputQueryParams): Dimension => {
  const width = parseInt(queryParams.width || '');
  const height = parseInt(queryParams.height || '');

  if (!isValidPixelCount(width) && !isValidPixelCount(height)) {
    return defaultDimension;
  } else if (!isValidPixelCount(width)) {
    return {
      height: Math.min(maxPx, height)
    };
  } else if (!isValidPixelCount(height)) {
    return {
      width: Math.min(maxPx, width)
    };
  } else {
    return {
      width: Math.min(maxPx, width),
      height: Math.min(maxPx, height)
    };
  }
};

export const isValidPixelCount = (parsedInt: number) => {
  return !isNaN(parsedInt) && parsedInt > 0;
};
