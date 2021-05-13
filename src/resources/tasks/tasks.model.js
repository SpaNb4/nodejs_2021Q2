const { v4: uuidv4 } = require('uuid');

class Task {
    constructor({ title, order, description, userId }) {
        this.id = uuidv4();
        this.title = title;
        this.order = order;
        this.description = description;
        this.userId = userId;
        Task.instances.push(this);
    }
}

module.exports = Task;
