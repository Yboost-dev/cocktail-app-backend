import {Body, Controller, Get, Post, Request, UseGuards} from '@nestjs/common';
import {AuthService} from "./auth.service";
import {JwtAuthGuard} from "./jwt-auth.guard";
import {RequesWithUser} from "./jwt.strategy";
import {UserService} from "../user/user.service";
import {CreateUserDto} from "./dto/create-user.dto";
import {LogUserDto} from "./dto/login-user.dto";

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService,
                private readonly userService: UserService) {
    }

    @Post('login')
    async login(@Body() authBody: LogUserDto) {
        console.log({authBody});
        return await this.authService.Login({authBody});
    }
    @Post('register')
    async register(@Body() registerBody: CreateUserDto) {
        return await this.authService.Register({registerBody});
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    async getAuthenticateUser(@Request() request: RequesWithUser) {
        return await this.userService.getUser({userId: request.user.userId});
    }
}
