import Task from './tasks.model';

Task.instances = [];

const getAll = async (): Promise<Task[]> => Task.instances;

const getById = async (id: string): Promise<Task> => {
    const task = Task.instances.find((_task) => _task.id === id);

    if (!task) {
        throw new Error('Task not found');
    }

    return task;
};

const create = async (taskData: Task): Promise<Task> => {
    const task = await new Task(taskData);

    return task;
};

const update = async (id: string, newTaskData: Task): Promise<Task> => {
    const task = await getById(id);

    if (!task) {
        throw new Error('Task not found');
    }

    task.title = newTaskData.title;
    task.order = newTaskData.order;
    task.description = newTaskData.description;
    task.userId = newTaskData.userId;
    task.boardId = newTaskData.boardId;
    task.columnId = newTaskData.columnId;

    return task;
};

const remove = async (id: string): Promise<Task> => {
    const removedTask = await getById(id);

    if (!removedTask) {
        throw new Error('Task not found');
    }

    return Task.instances.splice(Task.instances.indexOf(removedTask), 1)[0]!;
};

export { getAll, getById, remove, create, update };
