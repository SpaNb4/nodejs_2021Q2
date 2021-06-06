import Board from './boards.model';
import Task from '../tasks/tasks.model';
import * as tasksRepo from '../tasks/tasks.memory.repository';

Board.instances = [];

const getAll = async (): Promise<Board[]> => Board.instances;

const getById = async (id: string): Promise<Board> => {
    const board = Board.instances.find((_board) => _board.id === id);

    if (!board) {
        throw new Error('Board not found');
    }

    return board;
};

const create = async (boardData: Board): Promise<Board> => {
    const board = await new Board(boardData);

    return board;
};

const update = async (id: string, newBoardData: Board): Promise<Board> => {
    const board = await getById(id);

    if (!board) {
        throw new Error('Board not found');
    }

    board.title = newBoardData.title;
    board.columns = newBoardData.columns;

    return board;
};

const remove = async (id: string): Promise<Board> => {
    const removedBoard = await getById(id);

    if (!removedBoard) {
        throw new Error('Board not found');
    }

    const tasks = await tasksRepo.getAll();

    if (tasks.length) {
        tasks.forEach(async (task: Task) => {
            if (task.boardId === id) {
                await tasksRepo.remove(task.id);
            }
        });
    }

    return Board.instances.splice(Board.instances.indexOf(removedBoard), 1)[0]!;
};

export { getAll, getById, remove, create, update };
