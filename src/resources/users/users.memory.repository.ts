import User from './users.model';
import * as tasksRepo from '../tasks/tasks.memory.repository';
import Task from "../tasks/tasks.model";

User.instances = [];

const getAll = async (): Promise<User[]> => User.instances;

const getById = async (id: string): Promise<User> => {
    const user = User.instances.find((_user) => _user.id === id);

    if (!user) {
        throw new Error('User not found');
    }

    return user;
};

const create = async (userData: User): Promise<User> => {
    const user = await new User(userData);

    return user;
};

const update = async (id: string, newUserData: User): Promise<User> => {
    const user = await getById(id);

    if (!user) {
        throw new Error('User not found');
    }

    user.name = newUserData.name;
    user.login = newUserData.login;
    user.password = newUserData.password;

    return user;
};

const remove = async (id: string): Promise<User> => {
    const removedUser = await getById(id);

    if (!removedUser) {
        throw new Error('User not found');
    }

    const tasks = await tasksRepo.getAll();

    if (tasks.length) {
        tasks.forEach(async (task: Task) => {
            if (task.userId === id) {
                await tasksRepo.update(task.id, { ...task, userId: null });
            }
        });
    }

    return User.instances.splice(User.instances.indexOf(removedUser), 1)[0]!;
};

export { getAll, getById, remove, create, update };
