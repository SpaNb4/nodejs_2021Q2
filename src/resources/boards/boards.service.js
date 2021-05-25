const boardsRepo = require('./boards.memory.repository');

const getAll = async () => {
    const boards = await boardsRepo.getAll();
    return boards;
};

const getById = async (id) => {
    const board = await boardsRepo.getById(id);
    return board;
};

const create = async (boardData) => {
    const board = await boardsRepo.create(boardData);
    return board;
};

const update = async (id, newBoardData) => {
    const board = await boardsRepo.update(id, newBoardData);
    return board;
};

const remove = async (id) => {
    const board = boardsRepo.remove(id);
    return board;
};

module.exports = { getAll, getById, create, update, remove };
