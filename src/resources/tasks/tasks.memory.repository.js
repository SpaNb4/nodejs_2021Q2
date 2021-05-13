const Task = require('./tasks.model');

Task.instances = [];

const getAll = async () => Task.instances;

const getById = async (id) => {
    const task = Task.instances.find((_task) => _task.id === id);

    if (!task) {
        throw new Error('Task not found');
    }

    return task;
};

const create = async (taskData) => {
    const task = await new Task(taskData);

    return task;
};

const update = async (id, newTaskData) => {
    const task = await getById(id);

    if (!task) {
        throw new Error('Task not found');
    }

    task.title = newTaskData.title;
    task.order = newTaskData.order;
    task.description = newTaskData.description;
    task.userId = newTaskData.userId;

    return task;
};

const remove = async (id) => {
    const removedTask = await getById(id);

    if (!removedTask) {
        throw new Error('Task not found');
    }

    return Task.instances.splice(Task.instances.indexOf(removedTask), 1)[0];
};

module.exports = { getAll, getById, remove, create, update };
