const { v4: uuidv4 } = require('uuid');

/**
 * Column type definition
 * @typedef {Object} column
 * @property {string} id Column ID
 * @property {string} title Column title
 * @property {number} order Column order
 */

/**
 * Board type definition
 * @typedef {Object} Board
 * @property {string} id Board ID
 * @property {string} title Board title
 * @property {column[]} columns Board columns
 */

class Board {
    constructor({ title, columns }) {
        this.id = uuidv4();
        this.title = title;
        this.columns = columns.map((column) => ({ ...column, id: uuidv4() }));
        Board.instances.push(this);
    }
}

module.exports = Board;
