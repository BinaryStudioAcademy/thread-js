class BaseRepository {
    constructor(model) {
        this.model = model;
    }

    getAll() {
        return this.model.findAll();
    }

    getById(uid) {
        return this.model.findByPk(uid);
    }
}

module.exports = BaseRepository;
