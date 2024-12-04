import {IsEmail, IsNotEmpty} from 'class-validator';

export class ResetPasswordDto {
    @IsEmail(
        {},
        {
            message: 'Vous devez entrer une adresse email valide',
        }
    )
    @IsNotEmpty()
    readonly email: string;
}