# check-cas-number

[![NPM version][npm-image]][npm-url]
[![build status][ci-image]][ci-url]
[![Test coverage][codecov-image]][codecov-url]
[![npm download][download-image]][download-url]

Check the validity of a CAS number (RN).

## Installation

`$ npm i check-cas-number`

## Usage

```js
import { check } from 'check-cas-number';
import { FifoLogger } from 'fifo-logger'; // possibility to have a logger

check('50-00-0'); // true
check('50-00-1'); // false

// you can get more information about the reason it was false
const logger = new FifoLogger();
check('50-00-1', { logger }); // false

console.log(logger.getLogs());
```

## License

[MIT](./LICENSE)

[npm-image]: https://img.shields.io/npm/v/check-cas-number.svg
[npm-url]: https://www.npmjs.com/package/check-cas-number
[ci-image]: https://github.com/cheminfo/check-cas-number/workflows/Node.js%20CI/badge.svg?branch=main
[ci-url]: https://github.com/cheminfo/check-cas-number/actions?query=workflow%3A%22Node.js+CI%22
[codecov-image]: https://img.shields.io/codecov/c/github/cheminfo/check-cas-number.svg
[codecov-url]: https://codecov.io/gh/cheminfo/check-cas-number
[download-image]: https://img.shields.io/npm/dm/check-cas-number.svg
[download-url]: https://www.npmjs.com/package/check-cas-number
