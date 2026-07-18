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
    });
  });
});
