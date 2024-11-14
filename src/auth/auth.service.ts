import {Injectable} from '@nestjs/common';
import {PrismaService} from "../prisma.service";
import {hash, compare} from 'bcrypt';
import {JwtService} from "@nestjs/jwt";
import {UserPayload} from "./jwt.strategy";
import {CreateUserDto} from "./dto/create-user.dto";
import {LogUserDto} from "./dto/login-user.dto";

@Injectable()
export class AuthService {
    constructor(private readonly prisma: PrismaService, private readonly jwtService: JwtService) {
    }

    async Login({authBody}: { authBody: LogUserDto }) {
        const {email, password} = authBody;

        const existingUser = await this.prisma.user.findUnique({
            where: {
                email,
            },
        });
        if (!existingUser) {
            throw new Error('Email ou mot de passe incorrect !');
        }

        const isPasswordValid = await this.isPasswordValid({password, hashedPassword: existingUser.password});
        if (!isPasswordValid) {
            throw new Error('Email ou mot de passe incorrect !');
        }

        return this.authenticateUser({userId: existingUser.id});
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
                throw new Error('Un compte existe déjà avec cet email');
            }

            const hashedPassword = await this.hashPassword({password});

            await this.prisma.user.create({
                data: {
                    email,
                    firstname,
                    lastname,
                    password: hashedPassword,
                },
            });

            return {message: 'Utilisateur créé avec succès', status: 201};

        } catch (error) {
            return {
                error: true,
                message: error.message,
            }
        }
    }

    private async hashPassword({password}: { password: string }) {
        return await hash(password, 10);
    }

    private async isPasswordValid({password, hashedPassword}: { password: string, hashedPassword: string }) {
        return await compare(password, hashedPassword);
    }

    private async authenticateUser({userId}: UserPayload) {
        const payload: UserPayload = {userId};
        return {
            access_token: this.jwtService.sign(payload),
        }
    }
}
