import Board from './boards.model';

const getAll = async (): Promise<Board[]> => Board.find();

const getById = async (id: string): Promise<Board> => {
    const board = await Board.findOne(id);

    if (!board) {
        throw new Error('Board not found');
    }

    return board;
};

const create = async (boardData: Board): Promise<Board> => {
    const board = new Board(boardData);

    await board.save();

    return board;
};

const update = async (id: string, newBoardData: Board): Promise<Board> => {
    const board = await getById(id);

    if (!board) {
        throw new Error('Board not found');
    }

    await Board.update(id, newBoardData);

    return board;
};

const remove = async (id: string): Promise<Board> => {
    const removedBoard = await getById(id);

    if (!removedBoard) {
        throw new Error('Board not found');
    }

    return Board.remove(removedBoard);
};

export { getAll, getById, remove, create, update };
