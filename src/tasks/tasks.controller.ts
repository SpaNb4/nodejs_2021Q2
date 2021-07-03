import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import Task from './task.entity';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
    constructor(private readonly tasksService: TasksService) {}

    @Post()
    create(@Body() taskData: Task) {
        return this.tasksService.create(taskData);
    }

    @Get()
    findAll() {
        return this.tasksService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.tasksService.findOne(id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() newTaskData: Task) {
        return this.tasksService.update(id, newTaskData);
    }

    @Delete(':id')
    delete(@Param('id') id: string) {
        return this.tasksService.delete(id);
    }
}
