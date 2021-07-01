import { UserStore } from './../interfaces/user-storage-interface';
import { CreateUserDto } from './../dto/create-user.dto';
import { UpdateUserDto } from './../dto/update-user.dto';
import UserEntity from './../entities/user.entity';
declare class PgUsersStorage implements UserStore {
    constructor();
    findAll: () => Promise<UserEntity[]>;
    findOne: (id: string) => Promise<UserEntity>;
    create: (userData: CreateUserDto) => Promise<UserEntity>;
    update: (id: string, newUserData: UpdateUserDto) => Promise<UserEntity>;
    remove: (id: string) => Promise<UserEntity>;
}
export default PgUsersStorage;
