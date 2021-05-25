const { v4: uuidv4 } = require('uuid');

/**
 * User type definition
 * @typedef {Object} User
 * @property {number} id User ID
 * @property {string} name User name
 * @property {string} login User login
 * @property {string} password User password
 */

class User {
    constructor({ name, login, password }) {
        this.id = uuidv4();
        this.name = name;
        this.login = login;
        this.password = password;
        User.instances.push(this);
    }

    static toResponse(user) {
        const { id, name, login } = user;
        return { id, name, login };
    }
}

module.exports = User;
