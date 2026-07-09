import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { JwtUserPayload } from './jwt-user-payload';
import { RequestWithUser } from './request-with-user';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<RequestWithUser>();
    const token = extractBearerToken(request);

    if (!token) {
      throw new UnauthorizedException('Missing bearer token');
    }

    try {
      request.user = await this.jwtService.verifyAsync<JwtUserPayload>(token);
      return true;
    } catch {
      throw new UnauthorizedException('Invalid bearer token');
    }
  }
}

function extractBearerToken(request: Request): string | null {
  const authorization = request.headers.authorization;

  if (!authorization) {
    return null;
  }

  const [type, token] = authorization.split(' ');

  if (type !== 'Bearer' || !token) {
    return null;
  }

  return token;
}
