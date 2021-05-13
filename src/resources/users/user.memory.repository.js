const User = require('./user.model');

User.instances = [];

const getAll = async () => User.instances;

const getById = async (id) => {
    const user = User.instances.find((_user) => _user.id === id);

    if (!user) {
        throw new Error('User not found');
    }

    return user;
};

const create = async (userData) => {
    const user = await new User(userData);

    return user;
};

const update = async (id, newUserData) => {
    const user = await getById(id);

    if (!user) {
        throw new Error('User not found');
    }

    user.name = newUserData.name;
    user.login = newUserData.login;
    user.password = newUserData.password;

    return user;
};

const remove = async (id) => {
    const removedUser = await getById(id);

    if (!removedUser) {
        throw new Error('User not found');
    }

    return User.instances.splice(User.instances.indexOf(removedUser), 1)[0];
};

module.exports = { getAll, getById, remove, create, update };
