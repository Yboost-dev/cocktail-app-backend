// user.controller.ts
import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';  // Service utilisateur

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get(':userId')
    getUser(@Param('userId') userId: string) {
        return this.userService.getUser({ userId });
    }
}
