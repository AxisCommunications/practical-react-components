module.exports = {
  collectCoverage: true,
  coveragePathIgnorePatterns: ['/node_modules/', '/__generated__/', '/build/'],
  testMatch: ['**/packages/**/?(*.)test.ts?(x)'],
  transformIgnorePatterns: ['node_modules/(?!@juggle)'],
  setupFiles: ['<rootDir>/jest/globals.tsx'],
}
