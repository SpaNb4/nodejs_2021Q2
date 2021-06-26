import { Entity, PrimaryColumn, Column as ColumnORM, BaseEntity } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import Column from '../columns/columns.model';

@Entity()
export default class Board extends BaseEntity {
    @PrimaryColumn('uuid')
    id: string;

    @ColumnORM()
    title: string;

    @ColumnORM('jsonb')
    columns: Column[];

    constructor({ id = uuidv4(), title = 'title', columns = [{ id: '1', title: 'title', order: 1 }] } = {}) {
        super();
        this.id = id;
        this.title = title;
        this.columns = <Column[]>columns;
    }
}
