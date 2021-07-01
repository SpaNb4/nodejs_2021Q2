import { Injectable } from '@nestjs/common';
import User from './user.entity';
import bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
    constructor() {}

    async create(userData: User) {
        const findUser = await User.findOne({ login: userData.login });

        if (findUser) {
            throw Object.assign(new Error('User already exists'), { status: 409 });
        }

        if (userData.password) {
            const hashedPassword = await bcrypt.hash(userData.password, 10);
            const user = new User({ ...userData, password: hashedPassword });
            await user.save();
            return user;
        }

        const user = new User(userData);
        await user.save();
        return user;
    }

    async findAll() {
        return User.find();
    }

    async findOne(id: string) {
        const user = await User.findOne(id);

        if (!user) {
            throw Object.assign(new Error('User not found'), { status: 404 });
        }

        return user;
    }

    async update(id: string, newUserData: User) {
        const user = await this.findOne(id);

        if (!user) {
            throw Object.assign(new Error('User not found'), { status: 404 });
        }

        await User.update(id, newUserData);

        return user;
    }

    async delete(id: string) {
        const removedUser = await this.findOne(id);

        if (!removedUser) {
            throw Object.assign(new Error('User not found'), { status: 404 });
        }

        return User.remove(removedUser);
    }
}
