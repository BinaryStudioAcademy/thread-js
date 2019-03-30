class UserRepository {
    getAll() {
        return 'Get all users.';
    }

    getById(id) {
        return 'Get by id.';
    }

    addUser(user) {
        return 'Add user.';
    }
}

module.exports = new UserRepository();
