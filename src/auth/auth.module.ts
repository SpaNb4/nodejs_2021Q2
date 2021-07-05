import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './jwt.strategy';
import { UsersService } from '../users/users.service';

@Module({
    imports: [
        PassportModule.register({
            defaultStrategy: 'jwt',
        }),
        JwtModule.register({
            secret: process.env['JWT_SECRET_KEY'],
        }),
    ],
    controllers: [AuthController],
    providers: [AuthService, UsersService, JwtStrategy],
    exports: [PassportModule, JwtStrategy],
})
export class AuthModule {}
