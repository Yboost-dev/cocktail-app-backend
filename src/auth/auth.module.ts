import {Module} from '@nestjs/common';
import {AuthController} from './auth.controller';
import {AuthService} from './auth.service';
import {PrismaService} from "../prisma.service";
import {JwtModule, JwtService} from "@nestjs/jwt";
import {JwtStrategy} from "./jwt.strategy";
import {UserService} from "../user/user.service";
import {MailerService} from "../mailer.service";

@Module({
    imports: [
        JwtModule.register({
            global: true,
            secret: process.env.JWT_SECRET,
            signOptions: {expiresIn: '30d'}
        })
    ],
    controllers: [AuthController],
    providers: [AuthService, PrismaService, JwtStrategy, UserService, MailerService]
})
export class AuthModule {
}
