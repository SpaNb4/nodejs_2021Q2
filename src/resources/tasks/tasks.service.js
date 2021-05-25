const tasksRepo = require('./tasks.memory.repository');

const getAll = async () => {
    const tasks = await tasksRepo.getAll();
    return tasks;
};

const getById = async (id) => {
    const task = await tasksRepo.getById(id);
    return task;
};

const create = async (taskData) => {
    const task = await tasksRepo.create(taskData);
    return task;
};

const update = async (id, newTaskData) => {
    const task = await tasksRepo.update(id, newTaskData);
    return task;
};

const remove = async (id) => {
    const task = tasksRepo.remove(id);
    return task;
};

module.exports = { getAll, getById, create, update, remove };
