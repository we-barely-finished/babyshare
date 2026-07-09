import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { MyUser } from '@babyshare/types';
import { PrismaService } from '../prisma/prisma.service';
import { mapMyUser } from './user.mapper';

type PrismaUserWithProfile = Prisma.UserGetPayload<{
  include: { profile: true };
}>;

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}

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
}
