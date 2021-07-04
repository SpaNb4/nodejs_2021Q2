import { Entity, PrimaryColumn, Column, OneToMany, BaseEntity } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
// eslint-disable-next-line import/no-cycle
import Task from '../tasks/task.entity';
import { IUserWithoutPassword } from './users.interface';

@Entity()
export default class User extends BaseEntity {
    @PrimaryColumn()
    id: string;

    @Column()
    name: string;

    @Column()
    login: string;

    @Column()
    password: string;

    @OneToMany(() => Task, (task: Task) => task.userId)
    tasks!: Task[];

    constructor({ id = uuidv4(), name = 'USER', login = 'user', password = 'P@55w0rd' } = {}) {
        super();
        this.id = id;
        this.name = name;
        this.login = login;
        this.password = password;
    }

    static toResponse(user: User): IUserWithoutPassword {
        const { id, name, login } = user;
        return { id, name, login };
    }
}
