import { pathsToModuleNameMapper } from 'ts-jest';
import tsconfigJson from './tsconfig.json' assert { type: 'json' };

const manageKey = (key: string): string => {
  return key.includes('(.*)') ? key.slice(0, -1) + '\\.js$' : key;
};

const manageMapper = (
  mapper: Record<string, string | string[]>
): Record<string, string | string[]> => ({
  ...Object.fromEntries(
    Object.entries(mapper).map(([key, value]) => [manageKey(key), value])
  ),
  '^(\\.{1,2}/.*)\\.js$': '$1'
});

export default {
  testEnvironment: 'jest-environment-node',
  preset: 'ts-jest/presets/default-esm',
  extensionsToTreatAsEsm: ['.ts'],
  modulePaths: ['<rootDir>'],
  testMatch: ['<rootDir>/tests/test-cases/**/*.test.ts'],
  transformIgnorePatterns: ['node_modules/'],
  testPathIgnorePatterns: ['node_modules/', 'dist/'],
  setupFilesAfterEnv: ['<rootDir>/tests/helpers/app-setup/app-setup.helper.ts'],
  moduleNameMapper: manageMapper(
    pathsToModuleNameMapper(tsconfigJson.compilerOptions.paths, {
      prefix: '<rootDir>/'
    }) as Record<string, string | string[]>
  ),
  transform: {
    '^.+\\.tsx?$': [
      'ts-jest',
      {
        isolatedModules: true,
        useESM: true
      }
    ]
  },
  testTimeout: 10_000,
  workerIdleMemoryLimit: '1GB'
};
