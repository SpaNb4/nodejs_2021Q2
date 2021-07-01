import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    create(createUserDto: CreateUserDto): Promise<import("./entities/user.entity").default>;
    findAll(): Promise<import("./entities/user.entity").default[]>;
    findOne(id: string): Promise<import("./entities/user.entity").default>;
    update(id: string, updateUserDto: UpdateUserDto): Promise<import("./entities/user.entity").default>;
    remove(id: string): Promise<import("./entities/user.entity").default>;
}
