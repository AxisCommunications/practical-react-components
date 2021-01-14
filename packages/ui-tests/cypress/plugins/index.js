/* eslint-disable-next-line @typescript-eslint/no-var-requires, @typescript-eslint/no-require-imports */
const webpack = require('@cypress/webpack-preprocessor')

/* eslint-disable-next-line @typescript-eslint/no-var-requires, @typescript-eslint/no-require-imports */
const webpackOptions = require('../webpack.config')

// Webpack configuration should be a default export
/* eslint-disable-next-line import/no-default-export, @typescript-eslint/no-explicit-any */
module.exports = on => {
  const options = {
    // send in the options from your webpack.config.js, so it works the same
    // as your app's code
    webpackOptions,
    watchOptions: {},
  }

  on('file:preprocessor', webpack(options))
}
