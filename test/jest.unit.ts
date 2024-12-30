import type { Config } from 'jest';

import jestConfigMain from '../jest.config';

const jestUnitConfig: Config = {
  ...jestConfigMain,
  testMatch: ['<rootDir>/src/**/*.spec.ts'],
  transform: {
    '^.+\\.(t|j)s?$': [
      'ts-jest',
      {
        tsconfig: '<rootDir>/test/tsconfig.spec.json'
      }
    ]
  },
  displayName: {
    name: 'node-test-task',
    color: 'green'
  },
  coverageDirectory: '<rootDir>/code-coverage/unit/istanbul-html',
  collectCoverageFrom: ['<rootDir>/src/**/*.ts'],
  reporters: [
    'default',
    [
      'jest-html-reporters',
      {
        darkTheme: true,
        filename: 'api-unit-reporters.html',
        includeConsoleLog: true,
        pageTitle: 'Node test task - unit tests',
        publicPath: 'code-coverage/unit/jest-html'
      }
    ]
  ]
};

export default jestUnitConfig;
