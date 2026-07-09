import { UserRole, UserStatus } from './types';

describe('shared user/profile types', () => {
  it('exports user role values', () => {
    expect(UserRole.USER).toEqual('USER');
    expect(UserRole.ADMIN).toEqual('ADMIN');
  });

  it('exports user status values', () => {
    expect(UserStatus.ACTIVE).toEqual('ACTIVE');
    expect(UserStatus.INACTIVE).toEqual('INACTIVE');
    expect(UserStatus.BLOCKED).toEqual('BLOCKED');
    expect(UserStatus.DELETED).toEqual('DELETED');
  });
});
