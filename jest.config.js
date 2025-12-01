// eslint-disable-next-line @typescript-eslint/no-require-imports
const nextJest = require('next/jest')


  const createJestConfig = nextJest({
    dir: './',
  })

  const customJestConfig = {
    setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
    testEnvironment: 'node',
    moduleNameMapper: {
      '^@/(.*)$': '<rootDir>/src/$1',
    },
    testMatch: ['**/__tests__/**/*.test.ts', '**/__tests__/**/*.test.js'],
    collectCoverageFrom: [
      'src/**/*.{js,jsx,ts,tsx}',
      '!src/**/*.d.ts',
      '!src/**/*.stories.{js,jsx,ts,tsx}',
    ],
    modulePathIgnorePatterns: ['<rootDir>/.next/'],
  }

  module.exports = createJestConfig(customJestConfig)