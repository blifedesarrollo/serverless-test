import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { REQUIERE_TOKEN_KEY } from 'src/decorators/token.decorator';

@Injectable()
export class TokenGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiereToken = this.reflector.getAllAndOverride<boolean>(
      REQUIERE_TOKEN_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (!requiereToken) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const tokenEnv = process.env.API_TOKEN;

    if (!tokenEnv) {
      throw new ForbiddenException('No hay token configurado');
    }

    const tokenHeader = request.headers['x-api-token'];
    const authorization = request.headers['authorization'];

    let token = tokenHeader;

    if (!token && authorization?.startsWith('Bearer ')) {
      token = authorization.replace('Bearer ', '').trim();
    }

    if (!token) {
      throw new UnauthorizedException('Token no proporcionado');
    }

    if (token !== tokenEnv) {
      throw new UnauthorizedException('Token inválido');
    }

    return true;
  }
}