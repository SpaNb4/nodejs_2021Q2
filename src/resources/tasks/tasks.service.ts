import * as tasksRepo from './tasks.memory.repository';
import Task from './tasks.model';

const getAll = async (): Promise<Task[]> => tasksRepo.getAll();

const getById = async (id: string): Promise<Task> => tasksRepo.getById(id);

const create = async (taskData: Task): Promise<Task> => tasksRepo.create(taskData);

const update = async (id: string, newTaskData: Task): Promise<Task> => tasksRepo.update(id, newTaskData);

const remove = async (id: string): Promise<Task> => tasksRepo.remove(id);

export { getAll, getById, create, update, remove };
