import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import {
  MyUser,
  MyUserProfile,
  UpdateMyUserProfileRequest,
} from '@babyshare/types';
import { PrismaService } from '../prisma/prisma.service';
import { mapMyUser, mapMyUserProfile } from './user.mapper';

const profileSelect = {
  userId: true,
  firstName: true,
  lastName: true,
  displayName: true,
  phoneNumber: true,
  city: true,
  municipality: true,
  addressLine: true,
  bio: true,
} satisfies Prisma.UserProfileSelect;

const userWithProfileSelect = {
  id: true,
  email: true,
  role: true,
  status: true,
  profile: { select: profileSelect },
} satisfies Prisma.UserSelect;

const authUserWithProfileSelect = {
  ...userWithProfileSelect,
  passwordHash: true,
} satisfies Prisma.UserSelect;

export type UserWithOptionalProfile = Prisma.UserGetPayload<{
  select: typeof userWithProfileSelect;
}>;

export type AuthUserWithProfile = Omit<
  Prisma.UserGetPayload<{ select: typeof authUserWithProfileSelect }>,
  'profile'
> & {
  profile: NonNullable<
    Prisma.UserGetPayload<{
      select: typeof authUserWithProfileSelect;
    }>['profile']
  >;
};

export interface CreateUserWithProfileInput {
  email: string;
  passwordHash: string;
  firstName: string;
  lastName: string;
  displayName: string;
  phoneNumber: string | null;
  city: string;
  municipality: string | null;
  addressLine: string | null;
  bio: string | null;
}

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}

  async createUserWithProfile(
    input: CreateUserWithProfileInput,
  ): Promise<MyUser> {
    const result = await this.prismaService.$transaction(async (tx) => {
      const user = await tx.user.create({
        data: {
          email: input.email,
          passwordHash: input.passwordHash,
        },
        select: {
          id: true,
          email: true,
          role: true,
          status: true,
        },
      });

      const profile = await tx.userProfile.create({
        data: {
          userId: user.id,
          firstName: input.firstName,
          lastName: input.lastName,
          displayName: input.displayName,
          phoneNumber: input.phoneNumber,
          city: input.city,
          municipality: input.municipality,
          addressLine: input.addressLine,
          bio: input.bio,
        },
        select: profileSelect,
      });

      return { user, profile };
    });

    return mapMyUser({ ...result.user, profile: result.profile });
  }

  async findMyUserById(userId: string): Promise<MyUser | null> {
    const user = await this.findUserWithProfileById(userId);

    if (!user?.profile) {
      return null;
    }

    return mapMyUser({ ...user, profile: user.profile });
  }

  async findUserWithProfileById(
    userId: string,
  ): Promise<UserWithOptionalProfile | null> {
    return this.prismaService.user.findUnique({
      where: { id: userId },
      select: userWithProfileSelect,
    });
  }

  async findAuthUserByEmail(
    email: string,
  ): Promise<AuthUserWithProfile | null> {
    const user = await this.prismaService.user.findUnique({
      where: { email },
      select: authUserWithProfileSelect,
    });

    if (!user?.profile) {
      return null;
    }

    return { ...user, profile: user.profile };
  }

  async updateMyUserProfile(
    userId: string,
    input: UpdateMyUserProfileRequest,
  ): Promise<MyUserProfile | null> {
    try {
      const profile = await this.prismaService.userProfile.update({
        where: { userId },
        data: input,
        select: profileSelect,
      });

      return mapMyUserProfile(profile);
    } catch (error) {
      if (isRecordNotFoundError(error)) {
        return null;
      }

      throw error;
    }
  }
}

function isRecordNotFoundError(error: unknown): boolean {
  return (
    error instanceof Prisma.PrismaClientKnownRequestError &&
    error.code === 'P2025'
  );
}
