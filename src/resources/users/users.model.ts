import { v4 as uuidv4 } from 'uuid';

/**
 * @typedef {Object} userWithoutPassword
 * @property {string} id User ID
 * @property {string} name User name
 * @property {string} login User login
 */

interface IUserWithoutPassword {
    id: string;
    name: string;
    login: string;
}

/**
 * User type definition
 */
export default class User {
    id: string;

    name: string;

    login: string;

    password: string;

    static instances: User[];

    constructor({ id = uuidv4(), name = 'USER', login = 'user', password = 'P@55w0rd' } = {}) {
        /**
         * User ID
         * @type {string}
         */
        this.id = id;
        /**
         * User name
         * @type {string}
         */
        this.name = name;
        /**
         * User login
         * @type {string}
         */
        this.login = login;
        /**
         * User password
         * @type {string}
         */
        this.password = password;
        User.instances.push(this);
    }

    /**
     * Hide user's password on output
     * @param {User} user user object with password
     * @return {userWithoutPassword} user object without password
     */
    static toResponse(user: User): IUserWithoutPassword {
        const { id, name, login } = user;
        return { id, name, login };
    }
}
