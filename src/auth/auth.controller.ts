import { Body, Controller, Post } from '@nestjs/common';
import { Public } from '../common/public-routes';
import User from '../users/user.entity';
import { IToken } from './auth.interface';
import { AuthService } from './auth.service';

@Controller()
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Public()
    @Post('/login')
    async create(@Body() userData: User): Promise<IToken> {
        return this.authService.login(userData);
    }
}
