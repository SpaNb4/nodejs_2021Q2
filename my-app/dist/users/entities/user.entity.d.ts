import { BaseEntity } from 'typeorm';
export default class UserEntity extends BaseEntity {
    id: string;
    name: string;
    login: string;
    password: string;
    tasks: string;
    constructor({ id, name, login, password, }?: {
        id?: any;
        name?: string;
        login?: string;
        password?: string;
    });
}
