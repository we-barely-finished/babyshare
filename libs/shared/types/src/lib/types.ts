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

export interface PublicUserProfile {
  userId: string;
  displayName: string;
  city: string;
  municipality: string;
  bio: string | null;
}

export interface MyUserProfile extends PublicUserProfile {
  firstName: string;
  lastName: string;
  phoneNumber: string | null;
  addressLine: string | null;
}

export interface MyUser {
  id: string;
  email: string;
  role: UserRole;
  status: UserStatus;
  profile: MyUserProfile;
}

export interface UpdateMyUserProfileRequest {
  firstName?: string;
  lastName?: string;
  displayName?: string;
  phoneNumber?: string | null;
  city?: string;
  municipality?: string;
  addressLine?: string | null;
  bio?: string | null;
}
