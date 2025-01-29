//src/auth/auth.service.ts
import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { plainToInstance } from 'class-transformer';
import { UserEntity } from '../users/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private prismaService: PrismaService,
  ) {}

  async login(email: string, password: string) {
    const user = await this.prismaService.user.findUnique({
      where: { email: email },
    });
    if (!user) {
      throw new NotFoundException(`No user found for email: ${email}`);
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid password');
    }
    return {
      accessToken: this.jwtService.sign({ userId: user.id }),
    };
  }

  async me(authorizationHeader: string) {
    try {
      const token = authorizationHeader.replace('Bearer ', '');
      const payload = this.jwtService.verify(token);

      const user = await this.prismaService.user.findUnique({
        where: { id: payload.userId },
      });

      if (!user) {
        throw new NotFoundException('Utilisateur non trouvé');
      }

      return plainToInstance(UserEntity, user);
    } catch {
      throw new UnauthorizedException('Token invalide ou expiré');
    }
  }
}
