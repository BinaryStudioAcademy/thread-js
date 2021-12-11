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
    /* const result = await this.model.update(data, {
      where: { id },
      returning: true,
      plain: true
    });

    return result[1]; */
  }

  deleteById(id) {
    return this.model.query().deleteById(id);
    /* return this.model.destroy({
      where: { id }
    }); */
  }
}

export { Abstract };
