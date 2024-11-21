import {IsEmail, IsNotEmpty, IsString, MaxLength, MinLength, Matches} from 'class-validator';

export class CreateUserDto {
    @IsString()
    @IsNotEmpty({
        message: 'Vous devez fournir un prénom',
    })
    readonly firstname: string;

    @IsString()
    @IsNotEmpty({
        message: 'Vous devez fournir un nom de famille',
    })
    readonly lastname: string;

    @IsEmail(
        {},
        {
            message: 'Vous devez entrer une adresse email valide',
        }
    )
    @IsNotEmpty()
    readonly email: string;

@IsString()
@IsNotEmpty()
@MinLength(12, {
    message: 'Le mot de passe doit être plus long que $constraint1 caractères',
})
@MaxLength(64, {
    message: 'Le mot de passe doit être plus court que $constraint1 caractères',
})
@Matches(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W)/, {
    message: 'Le mot de passe doit contenir au moins une lettre majuscule, une lettre minuscule, un chiffre et un caractère spécial',
})
readonly password: string;
}