import {BadRequestException, Injectable, NotFoundException} from '@nestjs/common';
import {CreateUserDto} from './dto/create-user.dto';
import {UpdateUserDto} from './dto/update-user.dto';
import {PrismaService} from "../prisma/prisma.service";
import * as bcrypt from 'bcrypt';

export const roundsOfHashing = 10;

@Injectable()
export class UsersService {
    constructor(private prisma: PrismaService) {
    }

    async create(createUserDto: CreateUserDto) {
        const userExisting = await this.prisma.user.findUnique({
            where: {email: createUserDto.email},
        })
        if (userExisting) {
            throw new BadRequestException(`User with email '${createUserDto.email}' already exists.`);
        }
        createUserDto.password = await bcrypt.hash(
            createUserDto.password,
            roundsOfHashing,
        );
        return this.prisma.user.create({
            data: createUserDto,
        });
    }

    async findAll() {
        const users = await this.prisma.user.findMany();
        if (!users || users.length === 0) {
            throw new NotFoundException(`No users found`);
        }
        return users;
    }

    async findOne(id: string) {
        const user = await this.prisma.user.findUnique({where: {id}});
        if (!user) {
            throw new NotFoundException(`User with ID ${id} does not exist.`);
        }
        return user;
    }

    async update(id: string, updateUserDto: UpdateUserDto) {
        const user = await this.prisma.user.findUnique({where: {id}});

        if (!user) {
            throw new NotFoundException(`User with ID ${id} does not exist.`);
        }

        if (updateUserDto.password) {
            updateUserDto.password = await bcrypt.hash(
                updateUserDto.password,
                roundsOfHashing,
            );
        }

        return this.prisma.user.update({
            where: {id},
            data: updateUserDto,
        });
    }

    remove(id: string) {
        return this.prisma.user.delete({where: {id}});
    }
}
