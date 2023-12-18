import { type DatabaseTableName } from '~/libs/packages/database/database.js';
import { type ValueOf } from '~/libs/types/types.js';

type CountParameters<
  T extends Record<string, unknown>,
  K extends Record<string, unknown>
> = {
  table: ValueOf<typeof DatabaseTableName>;
  condition?: Partial<T>;
  conditionNot?: K[];
  joins?: [ValueOf<typeof DatabaseTableName>, string, string][];
};

export { type CountParameters };
