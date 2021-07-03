import { Injectable } from '@nestjs/common';
import Board from './board.entity';

@Injectable()
export class BoardsService {
    constructor() {}

    async create(boardData: Board) {
        const board = new Board(boardData);

        await board.save();

        return board;
    }

    async findAll() {
        return Board.find();
    }

    async findOne(id: string) {
        const board = await Board.findOne(id);

        if (!board) {
            throw Object.assign(new Error('Board not found'), { status: 404 });
        }

        return board;
    }

    async update(id: string, newBoardData: Board) {
        const board = await this.findOne(id);

        if (!board) {
            throw Object.assign(new Error('Board not found'), { status: 404 });
        }

        await Board.update(id, newBoardData);

        return board;
    }

    async delete(id: string) {
        const removedBoard = await this.findOne(id);

        if (!removedBoard) {
            throw Object.assign(new Error('Board not found'), { status: 404 });
        }

        return Board.remove(removedBoard);
    }
}
