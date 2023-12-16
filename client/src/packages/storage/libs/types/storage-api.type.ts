import { type StorageKey } from '~/libs/enums/enums.js';
import { type ValueOf } from '~/libs/types/types.js';

type StorageApi = {
  set(key: ValueOf<typeof StorageKey>, value: string): Promise<void>;
  get<R = string>(key: ValueOf<typeof StorageKey>): Promise<R | null>;
  drop(key: ValueOf<typeof StorageKey>): Promise<void>;
  has(key: ValueOf<typeof StorageKey>): Promise<boolean>;
  clear(): Promise<void>;
};

export { type StorageApi };
