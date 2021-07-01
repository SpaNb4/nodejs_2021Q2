import { Entity, PrimaryColumn, Column, BaseEntity } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
// import { IUserWithoutPassword } from './users.interfaces';
// eslint-disable-next-line import/no-cycle
// import Task from '../tasks/tasks.model';

@Entity()
export default class User extends BaseEntity {
    @PrimaryColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    login: string;

    @Column()
    password: string;

    //   @OneToMany(() => Task, (task) => task.userId)
    //   tasks!: Task[];

    constructor({ id = uuidv4(), name = 'USER', login = 'user', password = 'P@55w0rd' } = {}) {
        super();
        this.id = id;
        this.name = name;
        this.login = login;
        this.password = password;
    }

    //   static toResponse(user: User): IUserWithoutPassword {
    //     const { id, name, login } = user;
    //     return { id, name, login };
    //   }
}
