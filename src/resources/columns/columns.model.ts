import { Entity, PrimaryColumn, Column as ColumnORM, BaseEntity } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

@Entity()
export default class Column extends BaseEntity {
    @PrimaryColumn()
    id: string;

    @ColumnORM()
    title: string;

    @ColumnORM()
    order: number;

    constructor({ id = uuidv4(), title = 'title', order = 1 } = {}) {
        super();
        this.id = id;
        this.title = title;
        this.order = order;
    }
}
