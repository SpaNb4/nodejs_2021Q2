import { v4 as uuidv4 } from 'uuid';
import { IUserWithoutPassword } from './users.interfaces';

export default class User {
    id: string;

    name: string;

    login: string;

    password: string;

    static instances: User[];

    constructor({ id = uuidv4(), name = 'USER', login = 'user', password = 'P@55w0rd' } = {}) {
        this.id = id;
        this.name = name;
        this.login = login;
        this.password = password;
        User.instances.push(this);
    }

    static toResponse(user: User): IUserWithoutPassword {
        const { id, name, login } = user;
        return { id, name, login };
    }
}
