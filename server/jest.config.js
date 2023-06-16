/* eslint-disable import/no-default-export */
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const srcPath = join(fileURLToPath(import.meta.url), '../src');

export default {
  testEnvironment: 'jest-environment-node',
  moduleNameMapper: {
    '#libs/(.*)': `${srcPath}/libs/$1`,
    '#packages/(.*)': `${srcPath}/packages/$1`
  }
};
