const Board = require('./boards.model');
const tasksRepo = require('../tasks/tasks.memory.repository');

Board.instances = [];

/**
 * Boards memory repository module
 * @module boards_memory_repository
 */

/**
 * Get all boards
 * @return {Promise<Board[]>} All boards array
 */
const getAll = async () => Board.instances;

/**
 * Get board by ID
 * @param {string} id Board ID
 * @return {(Promise<Board>|Error)} Received board or error
 */
const getById = async (id) => {
    const board = Board.instances.find((_board) => _board.id === id);

    if (!board) {
        throw new Error('Board not found');
    }

    return board;
};

/**
 * Create new board
 * @param {Object} boardData Data for board creation
 * @param {string} boardData.title Board title
 * @param {column[]} boardData.columns Board columns
 * @return {Promise<Board>} Created board
 */
const create = async (boardData) => {
    const board = await new Board(boardData);

    return board;
};

/**
 * Update board's data
 * @param {string} id Board ID
 * @param {Object} newBoardData New board's data
 * @param {string} newBoardData.title Board title
 * @param {column[]} newBoardData.columns Board columns
 * @return {(Promise<Board>|Error)} Updated board or error
 */
const update = async (id, newBoardData) => {
    const board = await getById(id);

    if (!board) {
        throw new Error('Board not found');
    }

    board.title = newBoardData.title;
    board.columns = newBoardData.columns;

    return board;
};

/**
 * Remove board
 * @param {string} id Board ID
 * @return {(Promise<Board>|Error)} Removed board or error
 */
const remove = async (id) => {
    const removedBoard = await getById(id);

    if (!removedBoard) {
        throw new Error('Board not found');
    }

    const tasks = await tasksRepo.getAll();

    if (tasks.length) {
        tasks.forEach(async (task) => {
            if (task.boardId === id) {
                await tasksRepo.remove(task.id);
            }
        });
    }

    return Board.instances.splice(Board.instances.indexOf(removedBoard), 1)[0];
};

module.exports = { getAll, getById, remove, create, update };
