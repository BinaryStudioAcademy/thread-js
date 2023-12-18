import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

import { pathsToModuleNameMapper } from 'ts-jest';

import tsconfigJson from './tsconfig.json' assert { type: 'json' };

const sourcePath = join(fileURLToPath(import.meta.url), '../');

const manageKey = key => {
  return key.includes('(.*)') ? key.slice(0, -1) + '\\.js$' : key;
};

const manageMapper = mapper => ({
  ...Object.fromEntries(
    Object.entries(mapper).map(([key, value]) => [manageKey(key), value])
  ),
  '^(\\.{1,2}/.*)\\.js$': '$1'
});

export default {
  testEnvironment: 'jest-environment-node',
  preset: 'ts-jest/presets/default-esm',
  extensionsToTreatAsEsm: ['.ts'],
  transformIgnorePatterns: ['node_modules/'],
  testPathIgnorePatterns: ['node_modules/', 'dist/', 'build/'],
  moduleNameMapper: manageMapper(
    pathsToModuleNameMapper(tsconfigJson.compilerOptions.paths, {
      prefix: sourcePath
    })
  ),
  transform: {
    '^.+\\.tsx?$': ['ts-jest', { useESM: true }]
  },
  testTimeout: 10_000,
  workerIdleMemoryLimit: '1GB'
};
