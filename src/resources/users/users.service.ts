import { IUserWithoutId } from './users.interfaces';
import * as usersRepo from './users.memory.repository';
import User from './users.model';

const getAll = async (): Promise<User[]> => usersRepo.getAll();

const getById = async (id: string): Promise<User> => usersRepo.getById(id);

const create = async (userData: IUserWithoutId): Promise<User> => usersRepo.create(userData);

const update = async (id: string, newUserData: IUserWithoutId): Promise<User> => usersRepo.update(id, newUserData);

const remove = async (id: string): Promise<User> => usersRepo.remove(id);

export { getAll, getById, create, update, remove };
