export default class BaseRepository {
  constructor(model) {
    this.model = model;
  }

  getAll() {
    return this.model.findAll();
  }

  getById(id) {
    return this.model.findByPk(id);
  }

  create(data) {
    return this.model.create(data);
  }

  async updateById(id, data) {
    const result = await this.model.update(data, {
      where: { id },
      returning: true,
      plain: true
    });

    return result[1];
  }

  deleteById(id) {
    return this.model.destroy({
      where: { id }
    });
  }
}
