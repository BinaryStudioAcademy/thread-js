import { type StorageKey } from '~/libs/enums/enums.js';
import { type ValueOf } from '~/libs/types/types.js';

import { type StorageApi } from './libs/types/types.js';

type Constructor = {
  storage: globalThis.Storage;
};

class Storage implements StorageApi {
  #storage: globalThis.Storage;

  public constructor({ storage }: Constructor) {
    this.#storage = storage;
  }

  public set(key: ValueOf<typeof StorageKey>, value: string): void {
    this.#storage.setItem(key as string, value);
  }

  public get<R = string>(key: ValueOf<typeof StorageKey>): R | null {
    return this.#storage.getItem(key as string) as R;
  }

  public drop(key: ValueOf<typeof StorageKey>): void {
    this.#storage.removeItem(key as string);
  }

  public has(key: ValueOf<typeof StorageKey>): boolean {
    const value = this.get(key);

    return Boolean(value);
  }

  public clear(): Promise<void> {
    this.#storage.clear();

    return Promise.resolve();
  }
}

export { Storage };
