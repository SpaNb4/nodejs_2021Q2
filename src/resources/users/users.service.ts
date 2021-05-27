import * as usersRepo from './users.memory.repository';
import User from './users.model';

/**
 * Users service module
 * @module users_service
 */

/**
 * Call getAll() function
 * @return {User[]} All users array
 */
const getAll = async (): Promise<User[]> => usersRepo.getAll();

/**
 * Call getById() function
 * @param {string} id User ID
 * @return {User} Received user
 */
const getById = async (id: string): Promise<User> => usersRepo.getById(id);

/**
 * Call create() function
 * @param {Object} userData Data for user creation
 * @param {string} userData.name User name
 * @param {string} userData.login User login
 * @param {string} userData.password User password
 * @return {User} Created user
 */
const create = async (userData: any): Promise<User> => usersRepo.create(userData);

/**
 * Call update() function
 * @param {string} id User ID
 * @param {Object} newUserData New user's data
 * @param {string} newUserData.name User name
 * @param {string} newUserData.login User login
 * @param {string} newUserData.password User password
 * @return {User} Updated user
 */
const update = async (id: string, newUserData: any): Promise<User> => usersRepo.update(id, newUserData);

/**
 * Call remove() function
 * @param {string} id User ID
 * @return {User} Removed user
 */
const remove = async (id: string): Promise<User>  => usersRepo.remove(id);

export { getAll, getById, create, update, remove };
