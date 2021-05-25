const Task = require('./tasks.model');

Task.instances = [];

/**
 * Tasks memory repository module
 * @module tasks_memory_repository
 */

/**
 * Get all tasks
 * @return {Promise<Task[]>} All tasks array
 */
const getAll = async () => Task.instances;

/**
 * Get task by ID
 * @param {string} id Task ID
 * @return {(Promise<Task>|Error)} Received task or error
 */
const getById = async (id) => {
    const task = Task.instances.find((_task) => _task.id === id);

    if (!task) {
        throw new Error('Task not found');
    }

    return task;
};

/**
 * Create new task
 * @param {Object} taskData Data for task creation
 * @param {string} taskData.title Task title
 * @param {string} taskData.order Task order
 * @param {string} taskData.description Task description
 * @param {string} taskData.userId Task userId
 * @param {string} taskData.boardId Task boardId
 * @param {string} taskData.columnId Task columnId
 * @return {Promise<Task>} Created task
 */
const create = async (taskData) => {
    const task = await new Task(taskData);

    return task;
};

/**
 * Update task's data
 * @param {string} id Task ID
 * @param {Object} taskData Data for task creation
 * @param {string} taskData.title Task title
 * @param {string} taskData.order Task order
 * @param {string} taskData.description Task description
 * @param {string} taskData.userId Task userId
 * @param {string} taskData.boardId Task boardId
 * @param {string} taskData.columnId Task columnId
 * @return {(Promise<Task>|Error)} Updated task or error
 */
const update = async (id, newTaskData) => {
    const task = await getById(id);

    if (!task) {
        throw new Error('Task not found');
    }

    task.title = newTaskData.title;
    task.order = newTaskData.order;
    task.description = newTaskData.description;
    task.userId = newTaskData.userId;
    task.boardId = newTaskData.boardId;
    task.columnId = newTaskData.columnId;

    return task;
};

/**
 * Remove task
 * @param {string} id Task ID
 * @return {(Promise<Task>|Error)} Removed task or error
 */
const remove = async (id) => {
    const removedTask = await getById(id);

    if (!removedTask) {
        throw new Error('Task not found');
    }

    return Task.instances.splice(Task.instances.indexOf(removedTask), 1)[0];
};

module.exports = { getAll, getById, remove, create, update };
