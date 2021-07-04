import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import User from './user.entity';
// import bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
    async create(userData: User): Promise<User> {
        // const findUser = await User.findOne({ login: userData.login });

        // if (findUser) {
        // throw new HttpException('User already exists', HttpStatus.CONFLICT);
        // }

        // if (userData.password) {
        //     const hashedPassword = await bcrypt.hash(userData.password, 10);
        //     const user = new User({ ...userData, password: hashedPassword });
        //     await user.save();
        //     return user;
        // }

        const user = new User(userData);
        await user.save();
        return user;
    }

    async findAll(): Promise<User[]> {
        return User.find();
    }

    async findOne(id: string): Promise<User> {
        const user = await User.findOne(id);

        if (!user) {
            throw new HttpException('User not found', HttpStatus.NOT_FOUND);
        }

        return user;
    }

    async update(id: string, newUserData: User): Promise<User> {
        const user = await this.findOne(id);

        if (!user) {
            throw new HttpException('User not found', HttpStatus.NOT_FOUND);
        }

        await User.update(id, newUserData);

        return user;
    }

    async delete(id: string): Promise<User> {
        const removedUser = await this.findOne(id);

        if (!removedUser) {
            throw new HttpException('User not found', HttpStatus.NOT_FOUND);
        }

        return User.remove(removedUser);
    }
}
