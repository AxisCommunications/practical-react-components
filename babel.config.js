const presets = [
  '@babel/preset-typescript',
  [
    '@babel/preset-react',
    {
      runtime: 'automatic',
    },
  ],
]

module.exports = {
  presets: [
    ['@babel/preset-env', { targets: { esmodules: true } }],
    ...presets,
  ],
  plugins: ['babel-plugin-styled-components'],
  env: {
    test: {
      presets: [
        ['@babel/preset-env', { targets: { node: 'current' } }],
        ...presets,
      ],
    },
    docs: {
      presets: [
        [
          '@babel/preset-env',
          {
            debug: false,
            useBuiltIns: 'usage',
            corejs: {
              version: 3,
              proposals: true,
            },
            modules: 'commonjs',
            targets: {
              browsers: [
                // Desktop browsers
                'last 4 Chrome versions',
                'Edge > 15',
                'last 4 Firefox versions',
                'Firefox ESR',
                'last 2 Safari major versions',

                // Mobile browsers
                'last 2 ChromeAndroid versions',
                'last 2 FirefoxAndroid versions',
                'last 2 iOS major versions',
              ],
            },
          },
        ],
        ...presets,
      ],
    },
  },
}
