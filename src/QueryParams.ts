export interface QueryParams {
  /**
   * The width/height of the output image.
   * If you specify only one dimension (width or height) the image will be scaled respecting the ratio.
   * If you specify both the image will be croped to the center if possible.
   * If nothing is specified the width will default to 1920.
   * Allowed values: 1 - 5000
   */
  width?: number;
  height?: number;

  /**
   * Converts the input image to jpg.
   * Defsult: false
   */
  jpg?: boolean;

  /**
   * Converts the input image to webp.
   * Default: false
   */
  webp?: boolean;

  /**
   * Specifies the output quality for jpg and webp.
   * Allowed values: 1 - 100
   * Default: 75
   */
  quality?: number;

  /**
   * Specifies if the output is a progressive image.
   * Only for jpg and png output.
   * Default: true
   */
  progressive?: boolean;

  /**
   * Blur the image.
   * Needs a value between 0.3 and 100 representing the sigma of the Gaussian mask, where sigma = 1 + radius / 2.
   * Keep in mind higher values will be very slow.
   */
  blur?: number;

  /**
   * If true the output image will be normalized to enhance
   * contrast by stretching its luminance to cover the full dynamic range.
   * Default: false
   */
  normalize?: boolean;
}

export type InputQueryParams = { [P in keyof QueryParams]?: string };
