import User from '../users/user.entity';

const createAdmin = async (): Promise<void> => {
    const findUser = await User.findOne({ login: 'admin' });

    if (findUser) {
        return;
    }

    const user = new User({ login: 'admin', password: 'admin' });
    await user.save();
};

export { createAdmin };
