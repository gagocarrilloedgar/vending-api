module.exports = {
  preset: 'ts-jest',
  transform: {
    '^.+\\.tsx?$': 'ts-jest'
  },
  collectCoverage: true,
  testEnvironment: 'node',
  testEnvironmentOptions: {
    NODE_ENV: 'test',
    APP_ENV: 'test'
  },
  restoreMocks: true,
  coveragePathIgnorePatterns: [
    '/node_modules/',
    '/dist/',
    '/public/',
    '/tests/config/'
  ],
  modulePathIgnorePatterns: [
    '/node_modules/',
    '/dist/',
    '/public/',
    '/tests/config/'
  ],
  coverageReporters: ['text', 'lcov', 'clover', 'html']
}
