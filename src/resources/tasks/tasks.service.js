const tasksRepo = require('./tasks.memory.repository');

/**
 * Tasks service module
 * @module tasks_service
 */

/**
 * Call getAll() function
 * @return {Task[]} All tasks array
 */
const getAll = async () => tasksRepo.getAll();

/**
 * Call getById() function
 * @param {string} id Task ID
 * @return {Task} Received task
 */
const getById = async (id) => tasksRepo.getById(id);

/**
 * Call create() function
 * @param {Object} taskData Data for task creation
 * @param {string} taskData.title Task title
 * @param {string} taskData.order Task order
 * @param {string} taskData.description Task description
 * @param {string} taskData.userId Task userId
 * @param {string} taskData.boardId Task boardId
 * @param {string} taskData.columnId Task columnId
 * @return {Task} Created task
 */
const create = async (taskData) => tasksRepo.create(taskData);

/**
 * Call update() function
 * @param {string} id Task ID
 * @param {Object} taskData Data for task creation
 * @param {string} taskData.title Task title
 * @param {string} taskData.order Task order
 * @param {string} taskData.description Task description
 * @param {string} taskData.userId Task userId
 * @param {string} taskData.boardId Task boardId
 * @param {string} taskData.columnId Task columnId
 * @return {Task} Updated task
 */
const update = async (id, newTaskData) => tasksRepo.update(id, newTaskData);

/**
 * Call remove() function
 * @param {string} id Task ID
 * @return {(Promise<Task>|Error)} Removed task
 */
const remove = async (id) => tasksRepo.remove(id);

module.exports = { getAll, getById, create, update, remove };
