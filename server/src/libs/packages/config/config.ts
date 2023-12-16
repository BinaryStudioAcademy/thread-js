import { Config } from './config.package.js';

const config = new Config();

export { config };
export {
  type ConfigPackage,
  type EnvironmentSchema
} from './libs/types/types.js';
