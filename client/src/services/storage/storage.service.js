class Storage {
  constructor({ storage }) {
    this._storage = storage;
  }

  getItem(key) {
    return this._storage.getItem(key);
  }

  setItem(key, value) {
    return this._storage.setItem(key, value);
  }

  removeItem(key) {
    return this._storage.removeItem(key);
  }

  clear() {
    return this._storage.clear();
  }
}

export { Storage };
