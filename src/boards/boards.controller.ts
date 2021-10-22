import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import Board from './board.entity';
import { BoardsService } from './boards.service';

@Controller('boards')
export class BoardsController {
    constructor(private readonly boardsService: BoardsService) {}

    @Post()
    create(@Body() boardData: Board): Promise<Board> {
        return this.boardsService.create(boardData);
    }

    @Get()
    findAll(): Promise<Board[]> {
        return this.boardsService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string): Promise<Board> {
        return this.boardsService.findOne(id);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() newBoardData: Board): Promise<Board> {
        return this.boardsService.update(id, newBoardData);
    }

    @Delete(':id')
    delete(@Param('id') id: string): Promise<Board> {
        return this.boardsService.delete(id);
    }
}
