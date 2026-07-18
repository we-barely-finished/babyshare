import { Injectable } from '@nestjs/common';
import { Prisma, User, UserProfile } from '@prisma/client';
import {
  MyUser,
  MyUserProfile,
  UpdateMyUserProfileRequest,
} from '@babyshare/types';
import { PrismaService } from '../prisma/prisma.service';
import { mapMyUser, mapMyUserProfile } from './user.mapper';

type PrismaUserWithProfile = Prisma.UserGetPayload<{
  include: { profile: true };
}>;

export type AuthUserWithProfile = User & {
  profile: UserProfile;
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
      });

      return { user, profile };
    });

    return mapMyUser(toUserWithProfile(result.user, result.profile));
  }

  async findMyUserById(userId: string): Promise<MyUser | null> {
    const user = await this.findUserWithProfileById(userId);

    if (!user?.profile) {
      return null;
    }

    return mapMyUser({
      ...user,
      profile: user.profile,
    });
  }

  async findUserWithProfileById(
    userId: string,
  ): Promise<PrismaUserWithProfile | null> {
    return this.prismaService.user.findUnique({
      where: { id: userId },
      include: { profile: true },
    });
  }

  async findAuthUserByEmail(email: string): Promise<AuthUserWithProfile | null> {
    const user = await this.prismaService.user.findUnique({
      where: { email },
      include: { profile: true },
    });

    if (!user?.profile) {
      return null;
    }

    return toUserWithProfile(user, user.profile);
  }

  async updateMyUserProfile(
    userId: string,
    input: UpdateMyUserProfileRequest,
  ): Promise<MyUserProfile> {
    const profile = await this.prismaService.userProfile.update({
      where: { userId },
      data: input,
    });

    return mapMyUserProfile(profile);
  }
}

function toUserWithProfile(
  user: User,
  profile: UserProfile,
): PrismaUserWithProfile {
  return {
    ...user,
    profile,
  };
}
