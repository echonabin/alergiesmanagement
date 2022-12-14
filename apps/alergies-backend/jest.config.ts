/* eslint-disable */
export default {
  displayName: 'alergies-backend',
  preset: '../../jest.preset.js',
  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/tsconfig.spec.json',
    },
  },
  testEnvironment: 'node',
  setupFilesAfterEnv: ['./src/test/setup.test.ts'],
  testPathIgnorePatterns: ['./src/test/setup.test.ts'],
  transform: {
    '^.+\\.[tj]s$': 'ts-jest',
  },
  moduleFileExtensions: ['ts', 'js', 'html'],
  coverageDirectory: '../../coverage/apps/alergies-backend',
};
