import jwt from 'jsonwebtoken';
import { JWT_SECRET_KEY } from '../../common/config';
import User from '../users/users.model';

const getToken = async (jsonObj: any): Promise<any> => {
    const user = await User.findOne({ login: jsonObj.login });

    if (!user) {
        throw new Error('User not found');
    }

    return jwt.sign({ userId: user!.id, login: jsonObj.login }, JWT_SECRET_KEY!);
};
export { getToken };
