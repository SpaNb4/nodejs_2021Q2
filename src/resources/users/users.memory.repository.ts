import bcrypt from 'bcrypt';
import User from './users.model';

const getAll = async (): Promise<User[]> => User.find();

const getById = async (id: string): Promise<User> => {
    const user = await User.findOne(id);

    if (!user) {
        throw Object.assign(new Error('User not found'), { status: 404 });
    }

    return user;
};

const create = async (userData: User): Promise<User> => {
    if (userData.password) {
        const hashedPassword = await bcrypt.hash(userData.password, 10);
        const user = new User({ ...userData, password: hashedPassword });
        await user.save();
        return user;
    }

    const user = new User(userData);
    await user.save();
    return user;
};

const update = async (id: string, newUserData: User): Promise<User> => {
    const user = await getById(id);

    if (!user) {
        throw Object.assign(new Error('User not found'), { status: 404 });
    }

    await User.update(id, newUserData);

    return user;
};

const remove = async (id: string): Promise<User> => {
    const removedUser = await getById(id);

    if (!removedUser) {
        throw Object.assign(new Error('User not found'), { status: 404 });
    }

    return User.remove(removedUser);
};

export { getAll, getById, remove, create, update };
