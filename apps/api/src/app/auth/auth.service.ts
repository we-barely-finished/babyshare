import {
  ConflictException,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Prisma } from '@prisma/client';
import { AuthSession, MyUser, UserStatus } from '@babyshare/types';
import * as argon2 from 'argon2';
import { UsersService } from '../users/users.service';
import { mapMyUser } from '../users/user.mapper';
import { LoginRequestDto } from './dto/login-request.dto';
import { RegisterRequestDto } from './dto/register-request.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async register(request: RegisterRequestDto): Promise<MyUser> {
    const email = normalizeRequiredString(request.email).toLowerCase();
    const passwordHash = await argon2.hash(request.password);

    try {
      return await this.usersService.createUserWithProfile({
        email,
        passwordHash,
        firstName: normalizeRequiredString(request.firstName),
        lastName: normalizeRequiredString(request.lastName),
        displayName: normalizeRequiredString(request.displayName),
        phoneNumber: normalizeOptionalString(request.phoneNumber),
        city: normalizeRequiredString(request.city),
        municipality: normalizeOptionalString(request.municipality),
        addressLine: normalizeOptionalString(request.addressLine),
        bio: normalizeOptionalString(request.bio),
      });
    } catch (error) {
      if (isUniqueConstraintError(error)) {
        throw new ConflictException('Email is already registered');
      }

      throw error;
    }
  }

  async login(request: LoginRequestDto): Promise<AuthSession> {
    const email = normalizeRequiredString(request.email).toLowerCase();
    const user = await this.usersService.findAuthUserByEmail(email);

    if (!user) {
      throwInvalidCredentials();
    }

    const passwordMatches = await argon2.verify(
      user.passwordHash,
      request.password,
    );

    if (!passwordMatches) {
      throwInvalidCredentials();
    }

    if (
      user.status === UserStatus.BLOCKED ||
      user.status === UserStatus.DELETED
    ) {
      throw new ForbiddenException('User account cannot log in');
    }

    const mappedUser = mapMyUser(user);
    const accessToken = await this.jwtService.signAsync({
      sub: mappedUser.id,
      email: mappedUser.email,
      role: mappedUser.role,
    });

    return {
      accessToken,
      tokenType: 'Bearer',
      user: mappedUser,
    };
  }

  async getMe(userId: string): Promise<MyUser> {
    const user = await this.usersService.findMyUserById(userId);

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    if (user.status === UserStatus.BLOCKED || user.status === UserStatus.DELETED) {
      throw new ForbiddenException('User account cannot access this resource');
    }

    return user;
  }
}

function normalizeRequiredString(value: string): string {
  return value.trim();
}

function normalizeOptionalString(value?: string | null): string | null {
  const normalized = value?.trim();

  return normalized ? normalized : null;
}

function isUniqueConstraintError(error: unknown): boolean {
  return (
    error instanceof Prisma.PrismaClientKnownRequestError &&
    error.code === 'P2002'
  );
}

function throwInvalidCredentials(): never {
  throw new UnauthorizedException('Invalid email or password');
}
