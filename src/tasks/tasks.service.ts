import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import Task from './task.entity';

@Injectable()
export class TasksService {
    async create(taskData: Partial<Task>): Promise<Task> {
        const task = new Task({
            title: taskData.title,
            order: taskData.order,
            description: taskData.description,
            userId: taskData.userId!,
            boardId: taskData.boardId,
            columnId: taskData.columnId,
        });

        await task.save();

        return task;
    }

    async findAll(): Promise<Task[]> {
        return Task.find();
    }

    async findOne(id: string): Promise<Task> {
        const task = await Task.findOne(id);

        if (!task) {
            throw new HttpException('Task not found', HttpStatus.NOT_FOUND);
        }

        return task;
    }

    async update(id: string, newTaskData: Task): Promise<Task> {
        const task = await this.findOne(id);

        if (!task) {
            throw new HttpException('Task not found', HttpStatus.NOT_FOUND);
        }

        await Task.update(id, newTaskData);

        return task;
    }

    async delete(id: string): Promise<Task> {
        const removedTask = await this.findOne(id);

        if (!removedTask) {
            throw new HttpException('Task not found', HttpStatus.NOT_FOUND);
        }

        return Task.remove(removedTask);
    }
}
