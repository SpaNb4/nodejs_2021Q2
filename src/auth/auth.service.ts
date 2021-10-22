import { forwardRef, HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import jwt from 'jsonwebtoken';
import User from '../users/user.entity';
import { UsersService } from '../users/users.service';
import { IJwtPayload, IToken } from './auth.interface';

@Injectable()
export class AuthService {
    constructor(@Inject(forwardRef(() => UsersService)) private readonly usersService: UsersService) {}

    async validateUser(payload: IJwtPayload): Promise<User> {
        const user = await this.usersService.findByPayload(payload);
        if (!user) {
            throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
        }
        return user;
    }

    async login(userData: User): Promise<IToken> {
        const user = await this.usersService.findByLogin(userData);
        const payload = { userId: user.id, login: user.login };
        return { token: jwt.sign(payload, process.env['JWT_SECRET_KEY']!) };
    }
}
