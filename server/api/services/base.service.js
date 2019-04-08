class BaseService {
    constructor(repository) {
        this.repository = repository;
    }

    getAll() {
        return this.repository.getAll();
    }

    getById(uid) {
        return this.repository.getById(uid);
    }
}

export default BaseService;
