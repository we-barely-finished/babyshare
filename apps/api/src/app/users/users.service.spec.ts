import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { UsersService } from './users.service';

describe('UsersService profile updates', () => {
  it('updates by userId and maps the persisted profile', async () => {
    const prismaService = {
      userProfile: {
        update: jest.fn().mockResolvedValue({
          id: 'profile-1',
          userId: 'user-1',
          firstName: 'Ana',
          lastName: 'Petrovic',
          displayName: 'Ana Updated',
          phoneNumber: null,
          city: 'Belgrade',
          municipality: null,
          addressLine: null,
          bio: null,
          createdAt: new Date('2026-07-09T00:00:00.000Z'),
          updatedAt: new Date('2026-07-18T00:00:00.000Z'),
        }),
      },
    };
    const service = new UsersService(
      prismaService as unknown as PrismaService,
    );

    await expect(
      service.updateMyUserProfile('user-1', {
        displayName: 'Ana Updated',
        phoneNumber: null,
      }),
    ).resolves.toEqual({
      userId: 'user-1',
      firstName: 'Ana',
      lastName: 'Petrovic',
      displayName: 'Ana Updated',
      phoneNumber: null,
      city: 'Belgrade',
      municipality: null,
      addressLine: null,
      bio: null,
    });
    expect(prismaService.userProfile.update).toHaveBeenCalledWith({
      where: { userId: 'user-1' },
      data: { displayName: 'Ana Updated', phoneNumber: null },
      select: {
        userId: true,
        firstName: true,
        lastName: true,
        displayName: true,
        phoneNumber: true,
        city: true,
        municipality: true,
        addressLine: true,
        bio: true,
      },
    });
  });

  it('returns null when the profile disappears before persistence updates it', async () => {
    const prismaService = {
      userProfile: {
        update: jest.fn().mockRejectedValue(
          new Prisma.PrismaClientKnownRequestError('Record not found', {
            code: 'P2025',
            clientVersion: 'test',
          }),
        ),
      },
    };
    const service = new UsersService(prismaService as unknown as PrismaService);

    await expect(
      service.updateMyUserProfile('user-1', { city: 'Novi Sad' }),
    ).resolves.toBeNull();
  });

  it('selects passwordHash only for authentication lookups', async () => {
    const prismaService = {
      user: {
        findUnique: jest.fn().mockResolvedValue(null),
      },
    };
    const service = new UsersService(prismaService as unknown as PrismaService);

    await service.findAuthUserByEmail('parent@example.com');

    expect(prismaService.user.findUnique).toHaveBeenCalledWith(
      expect.objectContaining({
        where: { email: 'parent@example.com' },
        select: expect.objectContaining({ passwordHash: true }),
      }),
    );
  });

  it('does not select passwordHash for current-user/profile lookups', async () => {
    const prismaService = {
      user: {
        findUnique: jest.fn().mockResolvedValue(null),
      },
    };
    const service = new UsersService(prismaService as unknown as PrismaService);

    await service.findUserWithProfileById('user-1');

    const query = prismaService.user.findUnique.mock.calls[0][0];
    expect(query.where).toEqual({ id: 'user-1' });
    expect(query.select).not.toHaveProperty('passwordHash');
  });
});
