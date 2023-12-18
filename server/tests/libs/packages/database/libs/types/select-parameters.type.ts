import { type DatabaseTableName } from '~/libs/packages/database/database.js';
import { type ValueOf } from '~/libs/types/types.js';

type SelectParameters<
  T extends Record<string, unknown>,
  K extends Record<string, unknown>
> = {
  table: ValueOf<typeof DatabaseTableName>;
  condition?: Partial<T> | undefined;
  conditionNot?: Partial<K> | undefined;
  conditionRaw?: [string, string | number] | undefined;
  columns?: string[];
  limit?: number;
  offset?: number;
  joins?: [ValueOf<typeof DatabaseTableName>, string, string][];
  shouldThrowErrorOnEmptyResult?: boolean;
};

export { type SelectParameters };
