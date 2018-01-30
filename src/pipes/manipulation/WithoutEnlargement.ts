import { curry } from 'ramda';
import { SharpInstance } from 'sharp';
import { InputQueryParams } from '../../QueryParams';
import { toBoolean } from '../../Utils';

export const withoutEnlargement = curry(
  (queryParams: InputQueryParams, transformer: SharpInstance) => {
    if (toBoolean(queryParams.withoutEnlargement, true)) {
      return transformer.withoutEnlargement();
    }

    return transformer;
  }
);
