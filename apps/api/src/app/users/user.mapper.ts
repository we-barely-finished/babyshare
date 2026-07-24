import {
  MyUser,
  MyUserProfile,
  PublicUserProfile,
  UserRole,
  UserStatus,
} from '@babyshare/types';

export interface ProfileMapperInput {
  userId: string;
  firstName: string;
  lastName: string;
  displayName: string;
  phoneNumber: string | null;
  city: string;
  municipality: string | null;
  addressLine: string | null;
  bio: string | null;
}

export interface UserWithProfileMapperInput {
  id: string;
  email: string;
  role: 'USER' | 'ADMIN';
  status: 'ACTIVE' | 'INACTIVE' | 'BLOCKED' | 'DELETED';
  profile: ProfileMapperInput;
}

/**
 * Maps a profile to the fields safe for public profile responses.
 */
export function mapPublicUserProfile(
  profile: ProfileMapperInput,
): PublicUserProfile {
  return {
    userId: profile.userId,
    displayName: profile.displayName,
    city: profile.city,
    municipality: profile.municipality,
    bio: profile.bio,
  };
}

/**
 * Maps a profile to the current user's own-profile response shape.
 */
export function mapMyUserProfile(profile: ProfileMapperInput): MyUserProfile {
  return {
    ...mapPublicUserProfile(profile),
    firstName: profile.firstName,
    lastName: profile.lastName,
    phoneNumber: profile.phoneNumber,
    addressLine: profile.addressLine,
  };
}

/**
 * Maps account and profile data to the current-user API contract.
 */
export function mapMyUser(user: UserWithProfileMapperInput): MyUser {
  return {
    id: user.id,
    email: user.email,
    role: mapUserRole(user.role),
    status: mapUserStatus(user.status),
    profile: mapMyUserProfile(user.profile),
  };
}

function mapUserRole(role: UserWithProfileMapperInput['role']): UserRole {
  switch (role) {
    case 'USER':
      return UserRole.USER;
    case 'ADMIN':
      return UserRole.ADMIN;
  }
}

function mapUserStatus(
  status: UserWithProfileMapperInput['status'],
): UserStatus {
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
