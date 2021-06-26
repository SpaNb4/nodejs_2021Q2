import * as loginRepo from './login.memory.repository';
import User from '../users/users.model';

const getToken = async (userData: Partial<User>): Promise<string | Error> => loginRepo.getToken(userData);

export { getToken };
