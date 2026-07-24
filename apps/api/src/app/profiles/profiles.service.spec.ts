import {
  BadRequestException,
  ForbiddenException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { User, UserProfile } from '@prisma/client';
import { UserStatus } from '@babyshare/types';
import { UsersService } from '../users/users.service';
import { ProfilesService } from './profiles.service';

describe('ProfilesService', () => {
  let service: ProfilesService;
  let usersService: {
    findUserWithProfileById: jest.Mock;
    updateMyUserProfile: jest.Mock;
  };

  beforeEach(() => {
    usersService = {
      findUserWithProfileById: jest.fn(),
      updateMyUserProfile: jest.fn(),
    };
    service = new ProfilesService(usersService as unknown as UsersService);
    usersService.findUserWithProfileById.mockResolvedValue({
      ...user,
      profile,
    });
  });

  it('returns the mapped own-profile contract', async () => {
    await expect(service.getMyProfile('user-1')).resolves.toEqual(
      mappedProfile,
    );
  });

  it('allows inactive users to view and update their profile', async () => {
    usersService.findUserWithProfileById.mockResolvedValue({
      ...user,
      status: 'INACTIVE',
      profile,
    });
    usersService.updateMyUserProfile.mockResolvedValue(mappedProfile);

    await expect(service.getMyProfile('user-1')).resolves.toEqual(
      mappedProfile,
    );
    await expect(
      service.updateMyProfile('user-1', { city: 'Novi Sad' }),
    ).resolves.toEqual(mappedProfile);
  });

  it.each([UserStatus.BLOCKED, UserStatus.DELETED])(
    'rejects %s users with forbidden',
    async (status) => {
      usersService.findUserWithProfileById.mockResolvedValue({
        ...user,
        status,
        profile,
      });

      await expect(service.getMyProfile('user-1')).rejects.toBeInstanceOf(
        ForbiddenException,
      );
      await expect(
        service.updateMyProfile('user-1', { city: 'Novi Sad' }),
      ).rejects.toBeInstanceOf(ForbiddenException);
    },
  );

  it('rejects an unknown authenticated user with unauthorized', async () => {
    usersService.findUserWithProfileById.mockResolvedValue(null);

    await expect(service.getMyProfile('missing-user')).rejects.toBeInstanceOf(
      UnauthorizedException,
    );
  });

  it('returns not found when the account has no profile', async () => {
    usersService.findUserWithProfileById.mockResolvedValue({
      ...user,
      profile: null,
    });

    await expect(service.getMyProfile('user-1')).rejects.toBeInstanceOf(
      NotFoundException,
    );
    await expect(
      service.updateMyProfile('user-1', { city: 'Novi Sad' }),
    ).rejects.toBeInstanceOf(NotFoundException);
  });

  it('rejects an empty patch after confirming the account and profile exist', async () => {
    await expect(service.updateMyProfile('user-1', {})).rejects.toBeInstanceOf(
      BadRequestException,
    );
    expect(usersService.findUserWithProfileById).toHaveBeenCalledWith('user-1');
    expect(usersService.updateMyUserProfile).not.toHaveBeenCalled();
  });

  it('preserves unauthorized precedence for an empty patch from a missing account', async () => {
    usersService.findUserWithProfileById.mockResolvedValue(null);

    await expect(
      service.updateMyProfile('missing-user', {}),
    ).rejects.toBeInstanceOf(UnauthorizedException);
    expect(usersService.updateMyUserProfile).not.toHaveBeenCalled();
  });

  it.each([UserStatus.BLOCKED, UserStatus.DELETED])(
    'preserves forbidden precedence for an empty patch from a %s account',
    async (status) => {
      usersService.findUserWithProfileById.mockResolvedValue({
        ...user,
        status,
        profile,
      });

      await expect(
        service.updateMyProfile('user-1', {}),
      ).rejects.toBeInstanceOf(ForbiddenException);
      expect(usersService.updateMyUserProfile).not.toHaveBeenCalled();
    },
  );

  it('passes only the authenticated user ID and patch fields to persistence', async () => {
    usersService.updateMyUserProfile.mockResolvedValue({
      ...mappedProfile,
      phoneNumber: null,
      bio: null,
    });

    await service.updateMyProfile('user-1', {
      displayName: 'Ana Updated',
      phoneNumber: null,
      bio: null,
    });

    expect(usersService.updateMyUserProfile).toHaveBeenCalledWith('user-1', {
      displayName: 'Ana Updated',
      phoneNumber: null,
      bio: null,
    });
  });

  it('returns not found when the profile disappears during the update', async () => {
    usersService.updateMyUserProfile.mockResolvedValue(null);

    await expect(
      service.updateMyProfile('user-1', { city: 'Novi Sad' }),
    ).rejects.toBeInstanceOf(NotFoundException);
  });
});

const user: User = {
  id: 'user-1',
  email: 'parent@example.com',
  passwordHash: 'hashed-password',
  role: 'USER',
  status: 'ACTIVE',
  createdAt: new Date('2026-07-09T00:00:00.000Z'),
  updatedAt: new Date('2026-07-09T00:00:00.000Z'),
};

const profile: UserProfile = {
  id: 'profile-1',
  userId: 'user-1',
  firstName: 'Ana',
  lastName: 'Petrovic',
  displayName: 'Ana P.',
  phoneNumber: null,
  city: 'Belgrade',
  municipality: null,
  addressLine: null,
  bio: null,
  createdAt: new Date('2026-07-09T00:00:00.000Z'),
  updatedAt: new Date('2026-07-09T00:00:00.000Z'),
};

const mappedProfile = {
  userId: 'user-1',
  firstName: 'Ana',
  lastName: 'Petrovic',
  displayName: 'Ana P.',
  phoneNumber: null,
  city: 'Belgrade',
  municipality: null,
  addressLine: null,
  bio: null,
};
