import User from './users.model';
import * as tasksRepo from '../tasks/tasks.memory.repository';
import Task from '../tasks/tasks.model';

const getAll = async (): Promise<User[]> => User.find();

const getById = async (id: string): Promise<User> => {
    const user = await User.findOne(id);

    if (!user) {
        throw new Error('User not found');
    }

    return user;
};

const create = async (userData: User): Promise<User> => {
    const user = new User(userData);

    await user.save();

    return user;
};

const update = async (id: string, newUserData: User): Promise<User | undefined> => {
    const user = await getById(id);

    if (!user) {
        throw new Error('User not found');
    }

    await User.update(id, newUserData);

    return User.findOne(id);
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
                await Task.update(task.id, { ...task, userId: null });
            }
        });
    }

    return User.remove(removedUser);
};

export { getAll, getById, remove, create, update };
