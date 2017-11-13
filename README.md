# [WIP] serverless-image-processor

[![Build Status](https://travis-ci.org/Mercateo/serverless-image-processor.svg?branch=master)](https://travis-ci.org/Mercateo/serverless-image-processor)
[![Coverage Status](https://coveralls.io/repos/github/Mercateo/serverless-image-processor/badge.svg?branch=master)](https://coveralls.io/github/Mercateo/serverless-image-processor?branch=master)
[![Greenkeeper badge](https://badges.greenkeeper.io/Mercateo/serverless-image-processor.svg)](https://greenkeeper.io/)
[![NSP Status](https://nodesecurity.io/orgs/opensource/projects/c56c0c76-edb1-460a-95c0-4be30a573a57/badge)](https://nodesecurity.io/orgs/opensource/projects/c56c0c76-edb1-460a-95c0-4be30a573a57)
[![Maintainability](https://api.codeclimate.com/v1/badges/149b0866f7121aad91a9/maintainability)](https://codeclimate.com/github/Mercateo/serverless-image-processor/maintainability)
[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://github.com/Mercateo/serverless-image-processor/blob/master/LICENSE)

This is a [Serverless](https://serverless.com) starter for an image processing lambda. It will create a Cloudfront Distribution, an API Gateway, a image source Bucket and a Lambda function. It's based on the phenomenal [sharp](https://github.com/lovell/sharp) image manipulation and conversion library.

Request flow is:  
User -> Cloudfront -> API Gateway -> Lambda

## Features
Request Url: ```https://[CloudfrontUrl]/[S3Key]```  
Possible query parameters are:
```typescript
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
```

# Local development

1. ```$ yarn```
2. ```$ yarn start```

That's it! :)

The start command will spin up an offline version of an API Gateway and a local S3 server (via [serverless-offline](https://github.com/dherault/serverless-offline)). After this you can query some test images (test.gif, test.jpg and test.png) via ```http://localhost:3000```. Due to restrictions in this setup you will only see the Base64 encoded response. 

# Contributing
Please feel free to open issue or create PRs. :)  
Just run the test suites (```yarn test``` and ```yarn test:e2e```) and create new tests for added features.

# A note on updating sharp
```sharp``` is fixed at version ```0.18.4```. If you plan to upgrade please follow [this](http://sharp.dimens.io/en/stable/install/#aws-lambda) guide and place the output in the ```compiled/``` folder.

# Credits
Example photos by Adi Constantin, Michael DePetris, Blake Connally on Unsplash

