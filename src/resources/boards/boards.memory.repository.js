const Board = require('./boards.model');

Board.instances = [];

const getAll = async () => Board.instances;

const getById = async (id) => {
    const board = Board.instances.find((_board) => _board.id === id);

    if (!board) {
        throw new Error('Board not found');
    }

    return board;
};

const create = async (boardData) => {
    const board = await new Board(boardData);

    return board;
};

const update = async (id, newBoardData) => {
    const board = await getById(id);

    if (!board) {
        throw new Error('Board not found');
    }

	board.title = newBoardData.title;
    board.columns = newBoardData.columns;

    return board;
};

const remove = async (id) => {
    const removedBoard = await getById(id);

    if (!removedBoard) {
        throw new Error('Board not found');
    }

    return Board.instances.splice(Board.instances.indexOf(removedBoard), 1)[0];
};

module.exports = { getAll, getById, remove, create, update };
