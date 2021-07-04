import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import Task from './task.entity';
import { TasksService } from './tasks.service';

@Controller('/boards/:id/tasks/')
export class TasksController {
    constructor(private readonly tasksService: TasksService) {}

    @Post()
    create(@Body() taskData: Task, @Param('id') boardId: string): Promise<Task> {
        return this.tasksService.create({ ...taskData, boardId });
    }

    @Get()
    findAll(): Promise<Task[]> {
        return this.tasksService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string): Promise<Task> {
        return this.tasksService.findOne(id);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() newTaskData: Task): Promise<Task> {
        return this.tasksService.update(id, newTaskData);
    }

    @Delete(':id')
    delete(@Param('id') id: string): Promise<Task> {
        return this.tasksService.delete(id);
    }
}
