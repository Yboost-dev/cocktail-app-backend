import {Body, Controller, Get, Post, Query, Request, UseGuards} from '@nestjs/common';
import {AuthService} from "./auth.service";
import {JwtAuthGuard} from "./jwt-auth.guard";
import {RequesWithUser} from "./jwt.strategy";
import {UserService} from "../user/user.service";
import {CreateUserDto} from "./dto/create-user.dto";
import {LogUserDto} from "./dto/login-user.dto";
import {ResetPasswordDto} from "./dto/reset-password.dto";


@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService,
                private readonly userService: UserService) {
    }

    @Post('login')
    async login(@Body() authBody: LogUserDto) {
        return await this.authService.Login({authBody});
    }

    @Post('request-reset-password')
    async requestUserPassword(@Body() ResetPasswordBody: ResetPasswordDto) {
        return await this.authService.ResetUserPasswordRequest({ResetPasswordBody});
    }

    @Get('verify-reset-password-token')
    async verifyResetPasswordToken(@Query('token') token: string) {
        return await this.authService.VerifyResetPasswordToken({token});
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
