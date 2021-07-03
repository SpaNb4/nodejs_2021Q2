import { Injectable } from '@nestjs/common';
import Task from './task.entity';

@Injectable()
export class TasksService {
    constructor() {}

    async create(taskData: Task) {
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

    async findAll() {
        return Task.find();
    }

    async findOne(id: string) {
        const task = await Task.findOne(id);

        if (!task) {
            throw Object.assign(new Error('Task not found'), { status: 404 });
        }

        return task;
    }

    async update(id: string, newTaskData: Task) {
        const task = await this.findOne(id);

        if (!task) {
            throw Object.assign(new Error('Task not found'), { status: 404 });
        }

        await Task.update(id, newTaskData);

        return task;
    }

    async delete(id: string) {
        const removedTask = await this.findOne(id);

        if (!removedTask) {
            throw Object.assign(new Error('Task not found'), { status: 404 });
        }

        return Task.remove(removedTask);
    }
}
