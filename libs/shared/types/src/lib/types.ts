export enum UserRole {
  USER = 'USER',
  ADMIN = 'ADMIN',
}

export enum UserStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  BLOCKED = 'BLOCKED',
  DELETED = 'DELETED',
}

/**
 * Public profile fields that can be returned for another user.
 */
export interface PublicUserProfile {
  userId: string;
  displayName: string;
  city: string;
  municipality: string | null;
  bio: string | null;
}

/**
 * Own-profile response shape for the currently authenticated user.
 */
export interface MyUserProfile extends PublicUserProfile {
  firstName: string;
  lastName: string;
  phoneNumber: string | null;
  addressLine: string | null;
}

/**
 * Current-user response shape returned by auth/profile endpoints.
 */
export interface MyUser {
  id: string;
  email: string;
  role: UserRole;
  status: UserStatus;
  profile: MyUserProfile;
}

/**
 * Authentication response returned after a successful login.
 */
export interface AuthSession {
  accessToken: string;
  tokenType: 'Bearer';
  user: MyUser;
}

/**
 * Patch-style request shape for future own-profile updates.
 */
export interface UpdateMyUserProfileRequest {
  firstName?: string;
  lastName?: string;
  displayName?: string;
  phoneNumber?: string | null;
  city?: string;
  municipality?: string | null;
  addressLine?: string | null;
  bio?: string | null;
}
