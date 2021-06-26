import Task from './tasks.model';

const getAll = async (): Promise<Task[]> => Task.find();

const getById = async (id: string): Promise<Task> => {
    const task = await Task.findOne(id);

    if (!task) {
        throw new Error('Task not found');
    }

    return task;
};

const create = async (taskData: Task): Promise<Task> => {
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
};

const update = async (id: string, newTaskData: Task): Promise<Task> => {
    const task = await getById(id);

    if (!task) {
        throw new Error('Task not found');
    }

    await Task.update(id, newTaskData);

    return task;
};

const remove = async (id: string): Promise<Task> => {
    const removedTask = await getById(id);

    if (!removedTask) {
        throw new Error('Task not found');
    }

    return Task.remove(removedTask);
};

export { getAll, getById, remove, create, update };
