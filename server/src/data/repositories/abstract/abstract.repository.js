class Abstract {
  constructor(model) {
    this.model = model;
  }

  getAll() {
    return this.model.query();
  }

  getById(id) {
    return this.model.query().findById(id);
  }

  create(data) {
    return this.model.query().insert(data);
  }

  updateById(id, data) {
    return this.model.query().patchAndFetchById(id, data);
  }

  deleteById(id) {
    return this.model.query().deleteById(id);
  }
}

export { Abstract };
