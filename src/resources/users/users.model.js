const { v4: uuidv4 } = require('uuid');

/**
 * @typedef {Object} userWithoutPassword
 * @property {string} id User ID
 * @property {string} name User name
 * @property {string} login User login
 */

/**
 * User type definition
 */
class User {
    constructor({ name, login, password }) {
        /**
         * User ID
         * @type {string}
         */
        this.id = uuidv4();
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
    static toResponse(user) {
        const { id, name, login } = user;
        return { id, name, login };
    }
}

module.exports = User;
