import { UserRole } from '@babyshare/types';

export interface JwtUserPayload {
  sub: string;
  email: string;
  role: UserRole;
}
