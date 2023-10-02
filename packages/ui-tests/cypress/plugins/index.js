const { startDevServer } = require('@cypress/webpack-dev-server')

const webpackConfig = require('../webpack.config')

// Webpack configuration should be a default export
module.exports = on => {
	on('dev-server:start', options => {
		return startDevServer({ options, webpackConfig })
	})
}
