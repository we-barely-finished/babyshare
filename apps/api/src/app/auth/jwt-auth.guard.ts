import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserRole } from '@babyshare/types';
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
      const payload =
        await this.jwtService.verifyAsync<Record<string, unknown>>(token);

      if (!isJwtUserPayload(payload)) {
        throw new UnauthorizedException('Invalid bearer token');
      }

      request.user = payload;
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

function isJwtUserPayload(payload: unknown): payload is JwtUserPayload {
  if (!payload || typeof payload !== 'object') {
    return false;
  }

  const candidate = payload as Partial<JwtUserPayload>;

  return (
    isNonEmptyString(candidate.sub) &&
    isNonEmptyString(candidate.email) &&
    isUserRole(candidate.role)
  );
}

function isUserRole(value: unknown): value is UserRole {
  return Object.values(UserRole).some((role) => role === value);
}

function isNonEmptyString(value: unknown): value is string {
  return typeof value === 'string' && value.trim().length > 0;
}
