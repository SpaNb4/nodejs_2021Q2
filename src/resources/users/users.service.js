const usersRepo = require('./users.memory.repository');

const getAll = async () => {
    const users = await usersRepo.getAll();
    return users;
};

const getById = async (id) => {
    const user = await usersRepo.getById(id);
    return user;
};

const create = async (userData) => {
    const user = await usersRepo.create(userData);
    return user;
};

const update = async (id, newUserData) => {
    const user = await usersRepo.update(id, newUserData);
    return user;
};

const remove = async (id) => {
    const user = usersRepo.remove(id);
    return user;
};

module.exports = { getAll, getById, create, update, remove };
