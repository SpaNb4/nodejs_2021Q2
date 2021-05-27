const { v4: uuidv4 } = require('uuid');

/**
 * Task type definition
 */
class Task {
    constructor({ title, order, description, userId, boardId, columnId }) {
        /**
         * Task ID
         * @type {string}
         */
        this.id = uuidv4();
        /**
         * Task title
         * @type {string}
         */
        this.title = title;
        /**
         * Task order
         * @type {string}
         */
        this.order = order;
        /**
         * Task description
         * @type {string}
         */
        this.description = description;
        /**
         * Task userId
         * @type {string}
         */
        this.userId = userId;
        /**
         * Task boardId
         * @type {string}
         */
        this.boardId = boardId;
        /**
         * Task columnId
         * @type {string}
         */
        this.columnId = columnId;
        Task.instances.push(this);
    }
}

module.exports = Task;
