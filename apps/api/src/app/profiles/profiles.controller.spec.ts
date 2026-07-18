import { GUARDS_METADATA } from '@nestjs/common/constants';
import { UserRole } from '@babyshare/types';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ProfilesController } from './profiles.controller';
import { ProfilesService } from './profiles.service';

describe('ProfilesController', () => {
  const profilesService = {
    getMyProfile: jest.fn(),
    updateMyProfile: jest.fn(),
  };
  const controller = new ProfilesController(
    profilesService as unknown as ProfilesService,
  );
  const payload = {
    sub: 'user-1',
    email: 'parent@example.com',
    role: UserRole.USER,
  };

  beforeEach(() => jest.clearAllMocks());

  it('protects the controller with the existing JWT guard', () => {
    expect(Reflect.getMetadata(GUARDS_METADATA, ProfilesController)).toContain(
      JwtAuthGuard,
    );
  });

  it('gets only the authenticated user profile', async () => {
    profilesService.getMyProfile.mockResolvedValue(profile);

    await expect(controller.getMe(payload)).resolves.toEqual(profile);
    expect(profilesService.getMyProfile).toHaveBeenCalledWith('user-1');
  });

  it('updates only the authenticated user profile', async () => {
    profilesService.updateMyProfile.mockResolvedValue(profile);

    await expect(
      controller.updateMe(payload, { displayName: 'Ana P.' }),
    ).resolves.toEqual(profile);
    expect(profilesService.updateMyProfile).toHaveBeenCalledWith('user-1', {
      displayName: 'Ana P.',
    });
  });
});

const profile = {
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
