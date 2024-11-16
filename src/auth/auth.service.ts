import { Injectable } from '@nestjs/common';
import { PrismaService } from "../prisma.service";
import { compare, genSalt } from 'bcrypt';
import * as argon from 'argon2';
import { JwtService } from "@nestjs/jwt";
import { UserPayload } from "./jwt.strategy";
import { CreateUserDto } from "./dto/create-user.dto";
import { LogUserDto } from "./dto/login-user.dto";
import * as process from "node:process";

@Injectable()
export class AuthService {
    private readonly pepper: string

    constructor(
        private readonly prisma: PrismaService,
        private readonly jwtService: JwtService,)
    {
        this.pepper = process.env.PEPPER
    }

    async Login({ authBody }: { authBody: LogUserDto }) {
        try {
            const { email, password } = authBody;

            const existingUser = await this.prisma.user.findUnique({
                where: {
                    email,
                },
            });

            if (!existingUser) {
                return {
                    statusCode: 400,
                    error: "Bad Request",
                    message: [
                        "Le mot de passe ou l'email est incorrect !",
                    ],
                };
            }

            const pepperedPassword = password + this.pepper + existingUser.salt
            const isPasswordValid = await this.isPasswordValid({
                pepperedPassword,
                hashedPassword: existingUser.password,
            });

            if (!isPasswordValid) {
                return {
                    statusCode: 400,
                    error: "Bad Request",
                    message: [
                        "Le mot de passe ou l'email est incorrect !",
                    ],
                };
            }

            return this.authenticateUser({ userId: existingUser.id });
        } catch (error) {
            return {
                status: 400,
                message: error.message || 'Une erreur est survenue.',
            };
        }
    }

    async Register({ registerBody }: { registerBody: CreateUserDto }) {
        const { email, firstname, lastname, password } = registerBody;

        try {
            // Vérifier si un utilisateur avec cet email existe déjà
            const existingUser = await this.prisma.user.findUnique({
                where: {
                    email,
                },
            });

            if (existingUser) {
                return {
                    statusCode: 400,
                    error: "Bad Request",
                    message: [
                        "Un compte existe déjà avec cet email",
                    ],
                };
            }

            const salt = await genSalt(10); // Vous pouvez aussi utiliser `argon2` pour générer un salt
            const hashedPassword = await this.hashPassword({ password: password + this.pepper, salt });

            // Création de l'utilisateur dans la base de données
            await this.prisma.user.create({
                data: {
                    email,
                    firstname,
                    lastname,
                    salt,
                    password: hashedPassword,
                },
            });

            return {
                status: 201,
                message: 'Utilisateur créé avec succès.',
            };

        } catch (error) {
            return {
                status: 400,
                message: error.message || 'Une erreur est survenue.',
            };
        }
    }

    private async hashPassword({ password, salt }: { password: string, salt: string }) {
        return await argon.hash(password + salt);
    }

    private async isPasswordValid({ pepperedPassword, hashedPassword }: { pepperedPassword: string, hashedPassword: string }) {
        return await argon.verify(hashedPassword, pepperedPassword);
    }

    private async authenticateUser({ userId }: UserPayload) {
        if (!userId) {
            throw new Error("userId manquant dans le payload");
        }

        const payload: UserPayload = { userId };
        const accessToken = this.jwtService.sign(payload);  // Création du JWT

        if (!accessToken) {
            throw new Error("Le token d'accès n'a pas pu être généré.");
        }

        return { access_token: accessToken };
    }

}
