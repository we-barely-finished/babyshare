import { User, UserProfile } from '@prisma/client';
import { UserRole, UserStatus } from '@babyshare/types';
import {
  mapMyUser,
  mapMyUserProfile,
  mapPublicUserProfile,
  UserWithProfile,
} from './user.mapper';

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
  bio: 'Selling outgrown baby items.',
  createdAt: new Date('2026-07-09T00:00:00.000Z'),
  updatedAt: new Date('2026-07-09T00:00:00.000Z'),
};

describe('user mappers', () => {
  it('maps public profile fields only', () => {
    expect(mapPublicUserProfile(profile)).toEqual({
      userId: 'user-1',
      displayName: 'Ana P.',
      city: 'Belgrade',
      municipality: null,
      bio: 'Selling outgrown baby items.',
    });
  });

  it('maps the current user profile with private fields', () => {
    expect(mapMyUserProfile(profile)).toEqual({
      userId: 'user-1',
      displayName: 'Ana P.',
      city: 'Belgrade',
      municipality: null,
      bio: 'Selling outgrown baby items.',
      firstName: 'Ana',
      lastName: 'Petrovic',
      phoneNumber: null,
      addressLine: null,
    });
  });

  it('maps the current user with account status and profile', () => {
    expect(mapMyUser({ ...user, profile } satisfies UserWithProfile)).toEqual({
      id: 'user-1',
      email: 'parent@example.com',
      role: UserRole.USER,
      status: UserStatus.ACTIVE,
      profile: {
        userId: 'user-1',
        displayName: 'Ana P.',
        city: 'Belgrade',
        municipality: null,
        bio: 'Selling outgrown baby items.',
        firstName: 'Ana',
        lastName: 'Petrovic',
        phoneNumber: null,
        addressLine: null,
      },
    });
  });
});
