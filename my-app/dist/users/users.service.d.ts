import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserStore } from './interfaces/user-storage-interface';
export declare class UsersService {
    private storage;
    constructor(storage: UserStore);
    create(createUserDto: CreateUserDto): Promise<import("./entities/user.entity").default>;
    findAll(): Promise<import("./entities/user.entity").default[]>;
    findOne(id: string): Promise<import("./entities/user.entity").default>;
    update(id: string, updateUserDto: UpdateUserDto): Promise<import("./entities/user.entity").default>;
    remove(id: string): Promise<import("./entities/user.entity").default>;
}
