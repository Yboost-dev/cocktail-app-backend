import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class OptionalJwtAuthGuard extends AuthGuard('jwt-optional') {
  handleRequest(err: any, user: any, info: any, context: ExecutionContext) {
    if (!err && user) {
      return user;
    }

    return null;
  }
}

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  handleRequest(err: any, user: any, info: any, context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();

    if (err || !user) {
      throw new UnauthorizedException('Access unauthorized');
    }
    return user;
  }
}
