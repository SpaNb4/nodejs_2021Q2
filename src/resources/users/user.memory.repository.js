const User = require('./user.model');
const tasksRepo = require('../tasks/tasks.memory.repository');

User.instances = [];

/**
 * User memory repository module
 * @module user.memory.repository
 */

/**
 * Get all users
 * @return {Promise<User[]>} All users array
 */
const getAll = async () => User.instances;

/**
 * Get user by ID
 * @param {number} id User ID
 * @return {(Promise<User>|Error)} Received user or error
 */
const getById = async (id) => {
    const user = User.instances.find((_user) => _user.id === id);

    if (!user) {
        throw new Error('User not found');
    }

    return user;
};

/**
 * Create new user
 * @param {Object} userData Data for user creation
 * @param {string} userData.name User name
 * @param {string} userData.login User login
 * @param {string} userData.password User password
 * @return {Promise<User>} Created user
 */
const create = async (userData) => {
    const user = await new User(userData);

    return user;
};

/**
 * Update user's data
 * @param {number} id User ID
 * @param {Object} newUserData New user's data
 * @param {string} newUserData.name User name
 * @param {string} newUserData.login User login
 * @param {string} newUserData.password User password
 * @return {(Promise<User>|Error)} Updated user or error
 */
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

/**
 * Remove user
 * @param {number} id User ID
 * @return {(Promise<User>|Error)} Removed user or error
 */
const remove = async (id) => {
    const removedUser = await getById(id);

    if (!removedUser) {
        throw new Error('User not found');
    }

    const tasks = await tasksRepo.getAll();

    if (tasks.length) {
        tasks.forEach(async (task) => {
            if (task.userId === id) {
                await tasksRepo.update(task.id, { ...task, userId: null });
            }
        });
    }

    return User.instances.splice(User.instances.indexOf(removedUser), 1)[0];
};

module.exports = { getAll, getById, remove, create, update };
