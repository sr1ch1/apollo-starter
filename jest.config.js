module.exports = {
  preset: 'ts-jest/presets/default-esm',
  testEnvironment: 'node',
  runner: 'groups',
  coverageDirectory: 'coverage',
  collectCoverageFrom: [
    'src/**/*.ts',
    // ignore types and generated code
    '!src/**/*.d.ts',
    '!src/models/__generated/*.ts',
    // ignore infrastructure code. It cannot be tested.
    '!src/server/**/server.ts',
    // ignore test code
    '!src/testUtils/**/*.ts',
  ],
  transform: {
    '^.+\\.[tj]sx?$': ['@swc/jest'],
    '^.+\\.graphql$': 'graphql-import-node/jest',
  },
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1',
  },
  moduleDirectories: ['node_modules', 'src'],
  testPathIgnorePatterns: ['build/', 'node_modules/'],
};
