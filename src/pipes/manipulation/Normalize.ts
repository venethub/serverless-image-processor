import { curry } from 'ramda';
import { SharpInstance } from 'sharp';
import { InputQueryParams } from '../../QueryParams';
import { toBoolean } from '../../Utils';

export const normalize = curry(
  (queryParams: InputQueryParams, transformer: SharpInstance) => {
    if (toBoolean(queryParams.normalize)) {
      return transformer.normalize();
    }

    return transformer;
  }
);
