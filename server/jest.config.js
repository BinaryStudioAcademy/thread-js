/* eslint-disable import/no-default-export */
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const sourcePath = join(fileURLToPath(import.meta.url), '../src');

export default {
  testEnvironment: 'jest-environment-node',
  moduleNameMapper: {
    '#libs/(.*)': `${sourcePath}/libs/$1`,
    '#packages/(.*)': `${sourcePath}/packages/$1`
  },
  testTimeout: 10_000,
  workerIdleMemoryLimit: '1GB'
};
