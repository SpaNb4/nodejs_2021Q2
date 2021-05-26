const boardsRepo = require('./boards.memory.repository');

/**
 * Boards service module
 * @module boards_service
 */

/**
 * Call getAll() function
 * @return {Board[]} All boards array
 */
const getAll = async () => boardsRepo.getAll();

/**
 * Call getById() function
 * @param {string} id Board ID
 * @return {Board} Received board
 */
const getById = async (id) => boardsRepo.getById(id);

/**
 * Call create() function
 * @param {Object} boardData Data for board creation
 * @param {string} boardData.title Board title
 * @param {column[]} boardData.columns Board columns
 * @return {Board} Created board
 */
const create = async (boardData) => boardsRepo.create(boardData);

/**
 * Call update() function
 * @param {string} id Board ID
 * @param {Object} newBoardData New board's data
 * @param {string} newBoardData.title Board title
 * @param {column[]} newBoardData.columns Board columns
 * @return {Board} Updated board
 */
const update = async (id, newBoardData) => boardsRepo.update(id, newBoardData);

/**
 * Call remove() function
 * @param {string} id Board ID
 * @return {Board} Removed board
 */
const remove = async (id) => boardsRepo.remove(id);

module.exports = { getAll, getById, create, update, remove };
