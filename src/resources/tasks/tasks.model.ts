import { Entity, PrimaryColumn, Column, ManyToOne, BaseEntity } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
// eslint-disable-next-line import/no-cycle
import User from '../users/users.model';

@Entity()
export default class Task extends BaseEntity {
    @PrimaryColumn()
    id: string;

    @Column()
    title: string;

    @Column()
    order: number;

    @Column()
    description: string;

    @Column({
        type: 'varchar',
        length: 150,
        nullable: true,
    })
    @ManyToOne(() => User, (user) => user.id)
    userId: string | null;

    @Column()
    boardId: string;

    @Column({
        type: 'varchar',
        length: 150,
        nullable: true,
    })
    columnId: string;

    constructor({
        id = uuidv4(),
        title = 'title',
        order = 1,
        description = 'description',
        userId = 'userId',
        boardId = 'boardId',
        columnId = 'columnId',
    } = {}) {
        super();
        this.id = id;
        this.title = title;
        this.order = order;
        this.description = description;
        this.userId = userId;
        this.boardId = boardId;
        this.columnId = columnId;
    }
}
