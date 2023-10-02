const { defineConfig } = require('cypress')

module.exports = defineConfig({
	e2e: {
		baseUrl: 'http://localhost:9009',
		specPattern: './src/**/*.spec.ts?(x)',
		supportFile: false,
	},
	viewportWidth: 1280,
	viewportHeight: 720,
	video: false,
	fixturesFolder: 'missing',
})
