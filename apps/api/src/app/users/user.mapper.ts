import type { User, UserProfile } from '@prisma/client';
import {
  MyUser,
  MyUserProfile,
  PublicUserProfile,
  UserRole,
  UserStatus,
} from '@babyshare/types';

export type UserWithProfile = User & {
  profile: UserProfile;
};

export function mapPublicUserProfile(
  profile: UserProfile,
): PublicUserProfile {
  return {
    userId: profile.userId,
    displayName: profile.displayName,
    city: profile.city,
    municipality: profile.municipality,
    bio: profile.bio,
  };
}

export function mapMyUserProfile(profile: UserProfile): MyUserProfile {
  return {
    ...mapPublicUserProfile(profile),
    firstName: profile.firstName,
    lastName: profile.lastName,
    phoneNumber: profile.phoneNumber,
    addressLine: profile.addressLine,
  };
}

export function mapMyUser(user: UserWithProfile): MyUser {
  return {
    id: user.id,
    email: user.email,
    role: mapUserRole(user.role),
    status: mapUserStatus(user.status),
    profile: mapMyUserProfile(user.profile),
  };
}

function mapUserRole(role: User['role']): UserRole {
  switch (role) {
    case 'USER':
      return UserRole.USER;
    case 'ADMIN':
      return UserRole.ADMIN;
  }
}

function mapUserStatus(status: User['status']): UserStatus {
  switch (status) {
    case 'ACTIVE':
      return UserStatus.ACTIVE;
    case 'INACTIVE':
      return UserStatus.INACTIVE;
    case 'BLOCKED':
      return UserStatus.BLOCKED;
    case 'DELETED':
      return UserStatus.DELETED;
  }
}
