const config = require('./jest.config');

// config.testMatch = ['**/tests/**/*.test.ts'];
config.testMatch = ['**/*.test.ts'];
config.coverageReporters = ['text', 'lcov'];

module.exports = config;
