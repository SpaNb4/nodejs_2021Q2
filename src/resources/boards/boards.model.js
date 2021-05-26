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
 */
class Board {
    constructor({ title, columns }) {
        /**
         * Board id
         * @type {string}
         */
        this.id = uuidv4();
        /**
         * Board title
         * @type {string}
         */
        this.title = title;
        /**
         * Board columns
         * @type {column[]}
         */
        this.columns = columns.map((column) => ({ ...column, id: uuidv4() }));
        Board.instances.push(this);
    }
}

module.exports = Board;
