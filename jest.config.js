module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  modulePathIgnorePatterns: [
    '<rootDir>/tests/integration',
    '<rootDir>/build',
    '<rootDir>/node_modules',
    '<rootDir>/tests/fixtures/'
  ],
  testEnvironmentOptions: {
    NODE_ENV: 'test',
    APP_ENV: 'test'
  },
  restoreMocks: true,
  coveragePathIgnorePatterns: ['node_modules', 'src/config', 'src/app.ts'],
  coverageReporters: ['text', 'lcov', 'clover', 'html']
}
