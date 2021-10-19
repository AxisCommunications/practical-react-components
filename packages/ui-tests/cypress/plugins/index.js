/* eslint-disable-next-line @typescript-eslint/no-var-requires, @typescript-eslint/no-require-imports */
const { startDevServer } = require('@cypress/webpack-dev-server')

/* eslint-disable-next-line @typescript-eslint/no-var-requires, @typescript-eslint/no-require-imports */
const webpackConfig = require('../webpack.config')

// Webpack configuration should be a default export
/* eslint-disable-next-line import/no-default-export, @typescript-eslint/no-explicit-any */
module.exports = on => {
  on('dev-server:start', options => {
    return startDevServer({ options, webpackConfig })
  })
}
