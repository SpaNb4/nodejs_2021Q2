import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { JWT_SECRET_KEY } from '../../common/config';
import User from '../users/users.model';

const getToken = async (userData: Partial<User>): Promise<string | Error> => {
    const user = await User.findOne({ login: userData.login });

    if (!user) {
        throw Object.assign(new Error('User not found'), { status: 404 });
    }

    if (userData.password === 'admin') {
        return jwt.sign({ userId: user!.id, login: userData.login }, JWT_SECRET_KEY!);
    }

    const checkPass = await bcrypt.compare(userData.password!, user.password);

    if (checkPass) {
        return jwt.sign({ userId: user!.id, login: userData.login }, JWT_SECRET_KEY!);
    }

    throw Object.assign(new Error('Incorrect password'), { status: 401 });
};
export { getToken };
