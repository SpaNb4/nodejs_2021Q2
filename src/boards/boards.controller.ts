import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import Board from './board.entity';
import { BoardsService } from './boards.service';

@Controller('boards')
export class BoardsController {
    constructor(private readonly boardsService: BoardsService) {}

    @Post()
    create(@Body() boardData: Board) {
        return this.boardsService.create(boardData);
    }

    @Get()
    findAll() {
        return this.boardsService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.boardsService.findOne(id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() newBoardData: Board) {
        return this.boardsService.update(id, newBoardData);
    }

    @Delete(':id')
    delete(@Param('id') id: string) {
        return this.boardsService.delete(id);
    }
}
