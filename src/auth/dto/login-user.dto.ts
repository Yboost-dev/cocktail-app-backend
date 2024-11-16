import {IsEmail, IsNotEmpty, IsString} from 'class-validator';

export class LogUserDto {

    @IsEmail(
        {},
        {
            message: 'Vous devez entrer une adresse email valide',
        }
    )
    @IsNotEmpty()
    readonly email: string;

    @IsString()
    @IsNotEmpty(
        {
            message: 'Vous devez entrer un mot de passe valide',
        }
    )
    readonly password: string;
}