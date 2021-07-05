import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import User from '../users/user.entity';
import { IJwtPayload } from './auth.interface';
import { AuthService } from './auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly authService: AuthService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: process.env['JWT_SECRET_KEY'],
        });
    }

    async validate(payload: IJwtPayload): Promise<User> {
        return this.authService.validateUser(payload);
    }
}
