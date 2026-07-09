import { ConflictException, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { MyUser } from '@babyshare/types';
import * as argon2 from 'argon2';
import { UsersService } from '../users/users.service';
import { RegisterRequestDto } from './dto/register-request.dto';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

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
