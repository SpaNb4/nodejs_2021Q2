import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import Board from './board.entity';

@Injectable()
export class BoardsService {
    async create(boardData: Board): Promise<Board> {
        const board = new Board(boardData);

        await board.save();

        return board;
    }

    async findAll(): Promise<Board[]> {
        return Board.find();
    }

    async findOne(id: string): Promise<Board> {
        const board = await Board.findOne(id);

        if (!board) {
            throw new HttpException('Board not found', HttpStatus.NOT_FOUND);
        }

        return board;
    }

    async update(id: string, newBoardData: Board): Promise<Board> {
        const board = await this.findOne(id);

        if (!board) {
            throw new HttpException('Board not found', HttpStatus.NOT_FOUND);
        }

        await Board.update(id, newBoardData);

        return board;
    }

    async delete(id: string): Promise<Board> {
        const removedBoard = await this.findOne(id);

        if (!removedBoard) {
            throw new HttpException('Board not found', HttpStatus.NOT_FOUND);
        }

        return Board.remove(removedBoard);
    }
}
