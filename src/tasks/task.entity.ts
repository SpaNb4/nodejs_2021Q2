import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn, BaseEntity } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import Board from '../boards/board.entity';
// eslint-disable-next-line import/no-cycle
import User from '../users/user.entity';

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
        nullable: true,
    })
    userId: string | null;

    @ManyToOne(() => User, (user) => user.id, {
        onDelete: 'SET NULL',
        nullable: true,
    })
    @JoinColumn({ name: 'userId' })
    user!: string | null;

    @Column()
    boardId: string;

    @ManyToOne(() => Board, (board) => board.id, {
        onDelete: 'CASCADE',
    })
    @JoinColumn({ name: 'boardId' })
    board!: string;

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
