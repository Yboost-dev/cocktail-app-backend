import {IsEmail, IsNotEmpty, IsString, MaxLength, MinLength} from 'class-validator';

export class CreateUserDto {
    @IsString()
    @IsNotEmpty({
        message: 'Vous devez fornir un prénom',
    })
    firstname: string;

    @IsString()
    @IsNotEmpty({
        message: 'Vous devez fornir un nom de famille',
    })
    lastname: string;

    @IsEmail(
        {},
        {
            message: 'Vous devez entrer une adresse email valide',
        }
    )
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(12, {
        message: 'Le mot de passe doit être plus long que $constraint1 caractères',
    })
    @MaxLength(64, {
        message: 'Le mot de passe doit être plus court que $constraint1 caractères',
    })
    password: string;
}