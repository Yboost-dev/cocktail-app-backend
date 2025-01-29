import {
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UsersService } from 'src/module/users/users.service';
import { ConfigService } from '@nestjs/config';
import { ERROR } from 'src/common/constants/error.constants';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private userService: UsersService) {
    const config = new ConfigService();
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.get('JWT_SECRET'),
    });
  }

  async validate(payload: { userId: string }) {
    try {
      // Rechercher l'utilisateur
      const user = await this.userService.findOne(payload.userId);

      // Confirmer la présence de l'utilisateur
      if (!user) {
        throw new UnauthorizedException(ERROR.UnauthorizedAccess);
      }

      // Vérifier le rôle
      if (user.role !== 'admin') {
        throw new ForbiddenException(ERROR.ForbiddenAction);
      }

      return user;
    } catch (error) {
      throw error;
    }
  }
}
