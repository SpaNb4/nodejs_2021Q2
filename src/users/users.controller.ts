import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import User from './user.entity';
import { IUserWithoutPassword } from './users.interface';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Post()
    async create(@Body() userData: User): Promise<IUserWithoutPassword> {
        const user = await this.usersService.create(userData);
        return User.toResponse(user);
    }

    @Get()
    async findAll(): Promise<IUserWithoutPassword[]> {
        const users = await this.usersService.findAll();
        return users.map(User.toResponse);
    }

    @Get(':id')
    async findOne(@Param('id') id: string): Promise<IUserWithoutPassword> {
        const user = await this.usersService.findOne(id);
        return User.toResponse(user);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() newUserData: User): Promise<User> {
        return this.usersService.update(id, newUserData);
    }

    @Delete(':id')
    delete(@Param('id') id: string): Promise<User> {
        return this.usersService.delete(id);
    }
}
