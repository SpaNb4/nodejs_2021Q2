import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import bcrypt from 'bcrypt';
import { IJwtPayload } from '../auth/auth.interface';
import User from './user.entity';

@Injectable()
export class UsersService {
    async create(userData: User): Promise<User> {
        const findUser = await User.findOne({ login: userData.login });

        if (findUser) {
            throw new HttpException('User already exists', HttpStatus.CONFLICT);
        }

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

    async findByPayload(userData: IJwtPayload): Promise<User | undefined> {
        const findUser = User.findOne({ login: userData.login });
        if (!findUser) {
            throw new HttpException('User not found. Forbidden', HttpStatus.FORBIDDEN);
        }
        return findUser;
    }

    async findByLogin(userData: User): Promise<User> {
        const user = await User.findOne({ login: userData.login });

        if (!user) {
            throw new HttpException('User not found. Forbidden', HttpStatus.FORBIDDEN);
        }

        const checkPass = await bcrypt.compare(userData.password!, user.password);

        if (!checkPass) {
            throw new HttpException('Incorrect password', HttpStatus.UNAUTHORIZED);
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
