import { type StorageKey } from '~/libs/enums/enums.js';
import { type ValueOf } from '~/libs/types/types.js';

type StorageApi = {
  set(key: ValueOf<typeof StorageKey>, value: string): void;
  get<R = string>(key: ValueOf<typeof StorageKey>): R | null;
  drop(key: ValueOf<typeof StorageKey>): void;
  has(key: ValueOf<typeof StorageKey>): boolean;
  clear(): void;
};

export { type StorageApi };
