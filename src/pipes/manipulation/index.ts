import { resize } from './Resize';
import { blur } from './Blur';
import { normalize } from './Normalize';
import { InputQueryParams } from '../../QueryParams';
import { SharpInstance } from 'sharp';
import { pipe, curry } from 'ramda';

export const manipulate = curry(
  (queryParams: InputQueryParams, transformer: SharpInstance) =>
    pipe(resize(queryParams), blur(queryParams), normalize(queryParams))(
      transformer
    )
);
