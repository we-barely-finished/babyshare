import { ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserRole } from '@babyshare/types';
import { JwtAuthGuard } from './jwt-auth.guard';
import { RequestWithUser } from './request-with-user';

describe('JwtAuthGuard', () => {
  let guard: JwtAuthGuard;
  let jwtService: {
    verifyAsync: jest.Mock;
  };
  let request: Partial<RequestWithUser>;

  beforeEach(() => {
    jwtService = {
      verifyAsync: jest.fn(),
    };
    request = {
      headers: {},
    };
    guard = new JwtAuthGuard(jwtService as unknown as JwtService);
  });

  it('attaches the verified token payload to the request', async () => {
    request.headers = { authorization: 'Bearer valid-token' };
    jwtService.verifyAsync.mockResolvedValue({
      sub: 'user-1',
      email: 'parent@example.com',
      role: UserRole.USER,
    });

    await expect(guard.canActivate(createContext(request))).resolves.toBe(true);
    expect(jwtService.verifyAsync).toHaveBeenCalledWith('valid-token');
    expect(request.user).toEqual({
      sub: 'user-1',
      email: 'parent@example.com',
      role: UserRole.USER,
    });
  });

  it('throws unauthorized when the bearer token is missing', async () => {
    await expect(
      guard.canActivate(createContext(request)),
    ).rejects.toBeInstanceOf(UnauthorizedException);
  });

  it('throws unauthorized when token verification fails', async () => {
    request.headers = { authorization: 'Bearer invalid-token' };
    jwtService.verifyAsync.mockRejectedValue(new Error('invalid token'));

    await expect(
      guard.canActivate(createContext(request)),
    ).rejects.toBeInstanceOf(UnauthorizedException);
  });

  it.each([
    { email: 'parent@example.com', role: UserRole.USER },
    { sub: '', email: 'parent@example.com', role: UserRole.USER },
    { sub: 'user-1', role: UserRole.USER },
    { sub: 'user-1', email: '', role: UserRole.USER },
    { sub: 'user-1', email: 'parent@example.com' },
    { sub: 'user-1', email: 'parent@example.com', role: '' },
  ])(
    'throws unauthorized when token payload shape is invalid',
    async (payload) => {
      request.headers = { authorization: 'Bearer invalid-payload-token' };
      jwtService.verifyAsync.mockResolvedValue(payload);

      await expect(
        guard.canActivate(createContext(request)),
      ).rejects.toBeInstanceOf(UnauthorizedException);
    },
  );

  it('rejects an unknown user role', async () => {
    request.headers = { authorization: 'Bearer invalid-role-token' };
    jwtService.verifyAsync.mockResolvedValue({
      sub: 'user-1',
      email: 'parent@example.com',
      role: 'MODERATOR',
    });

    await expect(
      guard.canActivate(createContext(request)),
    ).rejects.toBeInstanceOf(UnauthorizedException);
  });
});

function createContext(request: Partial<RequestWithUser>): ExecutionContext {
  return {
    switchToHttp: () => ({
      getRequest: () => request,
    }),
  } as ExecutionContext;
}
