import {Injectable} from '@nestjs/common';
import {PrismaService} from "../prisma.service";
import {compare, genSalt} from 'bcrypt';
import * as argon from 'argon2';
import {JwtService} from "@nestjs/jwt";
import {UserPayload} from "./jwt.strategy";
import {CreateUserDto} from "./dto/create-user.dto";
import {LogUserDto} from "./dto/login-user.dto";
import * as process from "node:process";
import {MailerService} from "../mailer.service";
import {createId} from "@paralleldrive/cuid2";
import {ResetPasswordDto} from "./dto/reset-password.dto";

@Injectable()
export class AuthService {
    private readonly pepper: string

    constructor(
        private readonly prisma: PrismaService,
        private readonly jwtService: JwtService,
        private readonly mailerService: MailerService,) {
        this.pepper = process.env.PEPPER
    }

    async Login({authBody}: { authBody: LogUserDto }) {
        try {
            const {email, password} = authBody;

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

            return this.authenticateUser({userId: existingUser.id});
        } catch (error) {
            return {
                status: 400,
                message: error.message || 'Une erreur est survenue.',
            };
        }
    }

    async ResetUserPasswordRequest({ResetPasswordBody}: { ResetPasswordBody: ResetPasswordDto }) {
        try {
            const {email} = ResetPasswordBody;
            const existingUser = await this.prisma.user.findUnique({
                where: {
                    email,
                },
            });

            if (!existingUser) {
                return {
                    status: 400,
                    error: "Bad Request",
                    message: [
                        "L'email n'existe pas.",
                    ],
                };
            }

            if (existingUser.isResettingPassword === true) {
                return {
                    status: 403,
                    message: [
                        "Une demande de réinitialisation de mot de passe est déjà en cours.",
                    ],
                };
            }

            const createdId = createId()
            await this.prisma.user.update({
                where: {
                    email,
                },
                data: {
                    isResettingPassword: true,
                    resetPasswordToken: createdId,
                }
            })

            await this.mailerService.sendRequestedPasswordEmail({
                recipient: existingUser.email,
                firstname: existingUser.firstname,
                token: createdId
            })

            return {
                error: false,
                status: 200,
                message: [
                    "Un email de réinitialisation de mot de passe a été envoyé.",
                ],
            }

        } catch (error) {
            return {
                status: 400,
                message: error.message || 'Une erreur est survenue.',
            };
        }
    }

    async VerifyResetPasswordToken({token}: { token: string }) {
        try {
            const existingUser = await this.prisma.user.findUnique({
                where: {
                    resetPasswordToken: token,
                },
            });

            if (!existingUser) {
                return {
                    status: 400,
                    error: "Bad Request",
                    message: [
                        "L'utilisateur n'existe pas.",
                    ],
                };
            }

            if (existingUser.isResettingPassword === false) {
                return {
                    status: 403,
                    message: [
                        "Aucune demande de réinitialisation de mot de passe n'est pas en cours.",
                    ],
                };
            }

            return {
                error: false,
                status: 200,
                message: [
                    "Le token est valide et peut être utilisé.",
                ],
            }

        } catch (error) {
            return {
                status: 400,
                message: error.message || 'Une erreur est survenue.',
            };
        }
    }

    async Register({registerBody}: { registerBody: CreateUserDto }) {

        try {
            const {email, firstname, lastname, password} = registerBody;

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

            const salt = await genSalt(10);
            const hashedPassword = await this.hashPassword({password: password + this.pepper, salt});

            await this.prisma.user.create({
                data: {
                    email,
                    firstname,
                    lastname,
                    salt,
                    password: hashedPassword,
                },
            });

            await this.mailerService.sendCreatedAccountEmail({recipient: email, firstname: firstname})

            return {
                status: 201,
                message: ['Utilisateur créé avec succès.'],
            };

        } catch (error) {
            return {
                status: 400,
                message: error.message || ['Une erreur est survenue.'],
            };
        }
    }

    private async hashPassword({password, salt}: { password: string, salt: string }) {
        return await argon.hash(password + salt);
    }

    private async isPasswordValid({pepperedPassword, hashedPassword}: {
        pepperedPassword: string,
        hashedPassword: string
    }) {
        return await argon.verify(hashedPassword, pepperedPassword);
    }

    private async authenticateUser({userId}: UserPayload) {
        if (!userId) {
            throw new Error("userId manquant dans le payload");
        }

        const payload: UserPayload = {userId};
        const accessToken = this.jwtService.sign(payload);  // Création du JWT

        if (!accessToken) {
            throw new Error("Le token d'accès n'a pas pu être généré.");
        }

        return {access_token: accessToken};
    }

}
