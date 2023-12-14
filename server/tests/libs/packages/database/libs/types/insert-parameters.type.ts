import { type DatabaseTableName } from '~/libs/packages/database/database.js';
import { type ValueOf } from '~/libs/types/types.js';

type InsertParameters<T extends Record<string, unknown>> = {
  table: ValueOf<typeof DatabaseTableName>;
  data: T | T[];
  returning?: string[];
};

export { type InsertParameters };
