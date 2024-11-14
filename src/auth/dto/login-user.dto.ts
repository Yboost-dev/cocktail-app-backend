import {IsEmail, IsNotEmpty, IsString} from 'class-validator';

export class LogUserDto {

    @IsNotEmpty()
    @IsEmail(
        {},
        {
            message: 'Vous devez entrer une adresse email valide',
        }
    )
    readonly email: string;

    @IsString()
    @IsNotEmpty()
    readonly password: string;
}