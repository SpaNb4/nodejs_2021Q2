import { v4 as uuidv4 } from 'uuid';
import { IColumn } from './boards.interfaces';

export default class Board {
    id: string;
    title: string;
    columns: IColumn[];
    static instances: Board[];

    constructor({ id = uuidv4(), title = 'title', columns = [{ title: 'title', order: 1 }] } = {}) {
        this.id = id;
        this.title = title;
        this.columns = columns.map((column) => ({ ...column, id: uuidv4() }));
        Board.instances.push(this);
    }
}
