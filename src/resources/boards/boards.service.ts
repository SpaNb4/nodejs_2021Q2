import { IBoardWithoutId } from './boards.interfaces';
import * as boardsRepo from './boards.memory.repository';
import Board from './boards.model';

const getAll = async (): Promise<Board[]> => boardsRepo.getAll();

const getById = async (id: string): Promise<Board> => boardsRepo.getById(id);

const create = async (boardData: IBoardWithoutId): Promise<Board> => boardsRepo.create(boardData);

const update = async (id: string, newBoardData: IBoardWithoutId): Promise<Board> => boardsRepo.update(id, newBoardData);

const remove = async (id: string): Promise<Board> => boardsRepo.remove(id);

export { getAll, getById, create, update, remove };
