const usersRepo = require('./user.memory.repository');

const getAll = async () => {
    const users = await usersRepo.getAll();
    return users;
};

const getById = async (id) => {
    const user = await usersRepo.getById(id);
    return user;
};

const createUser = async (userData) => {
    const user = await usersRepo.createUser(userData);
    return user;
};

const updateUser = async (id, newUserData) => {
    const user = await usersRepo.updateUser(id, newUserData);
    return user;
};

const deleteUser = async (id) => {
    const user = usersRepo.deleteUser(id);
    return user;
};

module.exports = { getAll, getById, createUser, updateUser, deleteUser };
