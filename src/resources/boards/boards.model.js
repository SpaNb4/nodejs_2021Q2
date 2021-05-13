const { v4: uuidv4 } = require('uuid');

class Board {
    constructor({ title, columns }) {
        this.id = uuidv4();
        this.title = title;
        this.columns = columns.map((column) => ({ ...column, id: uuidv4() }));
        Board.instances.push(this);
    }
}

module.exports = Board;
