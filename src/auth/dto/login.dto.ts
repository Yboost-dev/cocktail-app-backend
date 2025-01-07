import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class LoginDto {
    @IsEmail()
    @IsNotEmpty()
    @ApiProperty(
        {
            description: 'Email address',
            example: 'admin@admin.com'
        }
    )
    email: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(6)
    @ApiProperty(
        {
            description: 'Password',
            example: 'AdminUser'
        }
    )
    password: string;
}