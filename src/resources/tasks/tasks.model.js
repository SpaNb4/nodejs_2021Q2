const { v4: uuidv4 } = require('uuid');

/**
 * Task type definition
 * @typedef {Object} Task
 * @property {string} id Task ID
 * @property {string} title Task title
 * @property {string} order Task order
 * @property {string} description Task description
 * @property {string} userId Task userId
 * @property {string} boardId Task boardId
 * @property {string} columnId Task columnId
 */

class Task {
    constructor({ title, order, description, userId, boardId, columnId }) {
        this.id = uuidv4();
        this.title = title;
        this.order = order;
        this.description = description;
        this.userId = userId;
        this.boardId = boardId;
        this.columnId = columnId;
        Task.instances.push(this);
    }
}

module.exports = Task;
