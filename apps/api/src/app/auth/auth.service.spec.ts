import {
  ConflictException,
  ForbiddenException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Prisma, User, UserProfile } from '@prisma/client';
import { AuthSession, MyUser, UserRole, UserStatus } from '@babyshare/types';
import * as argon2 from 'argon2';
import {
  AuthUserWithProfile,
  CreateUserWithProfileInput,
  UsersService,
} from '../users/users.service';
import { AuthService } from './auth.service';
import { RegisterRequestDto } from './dto/register-request.dto';

jest.mock('argon2', () => ({
  hash: jest.fn(),
  verify: jest.fn(),
}));

describe('AuthService', () => {
  let authService: AuthService;
  let usersService: {
    createUserWithProfile: jest.Mock<Promise<MyUser>, [CreateUserWithProfileInput]>;
    findAuthUserByEmail: jest.Mock<Promise<AuthUserWithProfile | null>, [string]>;
    findMyUserById: jest.Mock<Promise<MyUser | null>, [string]>;
  };
  let jwtService: {
    signAsync: jest.Mock<Promise<string>, [Record<string, string>]>;
  };

  beforeEach(() => {
    usersService = {
      createUserWithProfile: jest.fn(),
      findAuthUserByEmail: jest.fn(),
      findMyUserById: jest.fn(),
    };
    jwtService = {
      signAsync: jest.fn(),
    };
    authService = new AuthService(
      usersService as unknown as UsersService,
      jwtService as unknown as JwtService,
    );
    jest.mocked(argon2.hash).mockResolvedValue('hashed-password');
    jest.mocked(argon2.verify).mockResolvedValue(true);
    jwtService.signAsync.mockResolvedValue('signed.jwt.token');
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('registers a user and returns the shared user contract', async () => {
    const createdUser: MyUser = {
      id: 'user-1',
      email: 'parent@example.com',
      role: UserRole.USER,
      status: UserStatus.ACTIVE,
      profile: {
        userId: 'user-1',
        firstName: 'Ana',
        lastName: 'Petrovic',
        displayName: 'Ana P.',
        phoneNumber: null,
        city: 'Belgrade',
        municipality: null,
        addressLine: null,
        bio: null,
      },
    };
    usersService.createUserWithProfile.mockResolvedValue(createdUser);

    const result = await authService.register({
      email: ' Parent@Example.COM ',
      password: 'supersecret',
      firstName: ' Ana ',
      lastName: ' Petrovic ',
      displayName: ' Ana P. ',
      phoneNumber: '   ',
      city: ' Belgrade ',
      municipality: undefined,
      addressLine: undefined,
      bio: undefined,
    } satisfies RegisterRequestDto);

    expect(argon2.hash).toHaveBeenCalledWith('supersecret');
    expect(usersService.createUserWithProfile).toHaveBeenCalledWith({
      email: 'parent@example.com',
      passwordHash: 'hashed-password',
      firstName: 'Ana',
      lastName: 'Petrovic',
      displayName: 'Ana P.',
      phoneNumber: null,
      city: 'Belgrade',
      municipality: null,
      addressLine: null,
      bio: null,
    });
    expect(result).toEqual(createdUser);
  });

  it('throws conflict when the email already exists', async () => {
    usersService.createUserWithProfile.mockRejectedValue(
      new Prisma.PrismaClientKnownRequestError('Unique constraint failed', {
        code: 'P2002',
        clientVersion: 'test',
        meta: { target: ['email'] },
      }),
    );

    await expect(
      authService.register({
        email: 'parent@example.com',
        password: 'supersecret',
        firstName: 'Ana',
        lastName: 'Petrovic',
        displayName: 'Ana P.',
        city: 'Belgrade',
      } satisfies RegisterRequestDto),
    ).rejects.toBeInstanceOf(ConflictException);
  });

  it('logs in with valid credentials and returns an auth session', async () => {
    usersService.findAuthUserByEmail.mockResolvedValue(authUser);

    const result = await authService.login({
      email: ' Parent@Example.COM ',
      password: 'supersecret',
    });

    expect(usersService.findAuthUserByEmail).toHaveBeenCalledWith(
      'parent@example.com',
    );
    expect(argon2.verify).toHaveBeenCalledWith(
      'hashed-password',
      'supersecret',
    );
    expect(jwtService.signAsync).toHaveBeenCalledWith({
      sub: 'user-1',
      email: 'parent@example.com',
      role: UserRole.USER,
    });
    expect(result).toEqual({
      accessToken: 'signed.jwt.token',
      tokenType: 'Bearer',
      user: myUser,
    } satisfies AuthSession);
  });

  it('throws unauthorized when the email is unknown', async () => {
    usersService.findAuthUserByEmail.mockResolvedValue(null);

    await expect(
      authService.login({
        email: 'missing@example.com',
        password: 'supersecret',
      }),
    ).rejects.toBeInstanceOf(UnauthorizedException);
    expect(argon2.verify).not.toHaveBeenCalled();
  });

  it('throws unauthorized when the password is invalid', async () => {
    usersService.findAuthUserByEmail.mockResolvedValue(authUser);
    jest.mocked(argon2.verify).mockResolvedValue(false);

    await expect(
      authService.login({
        email: 'parent@example.com',
        password: 'wrong-password',
      }),
    ).rejects.toBeInstanceOf(UnauthorizedException);
  });

  it.each(['BLOCKED', 'DELETED'] as const)(
    'throws forbidden when the user status is %s',
    async (status) => {
      usersService.findAuthUserByEmail.mockResolvedValue({
        ...authUser,
        status,
      });

      await expect(
        authService.login({
          email: 'parent@example.com',
          password: 'supersecret',
        }),
      ).rejects.toBeInstanceOf(ForbiddenException);
    },
  );

  it('returns the current user for active auth/me requests', async () => {
    usersService.findMyUserById.mockResolvedValue(myUser);

    await expect(authService.getMe('user-1')).resolves.toEqual(myUser);
    expect(usersService.findMyUserById).toHaveBeenCalledWith('user-1');
  });

  it('throws unauthorized for auth/me when the user is missing', async () => {
    usersService.findMyUserById.mockResolvedValue(null);

    await expect(authService.getMe('missing-user')).rejects.toBeInstanceOf(
      UnauthorizedException,
    );
  });

  it.each([UserStatus.BLOCKED, UserStatus.DELETED])(
    'throws forbidden for auth/me when the user status is %s',
    async (status) => {
      usersService.findMyUserById.mockResolvedValue({
        ...myUser,
        status,
      });

      await expect(authService.getMe('user-1')).rejects.toBeInstanceOf(
        ForbiddenException,
      );
    },
  );
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

const authUser: AuthUserWithProfile = {
  ...user,
  profile,
};

const myUser: MyUser = {
  id: 'user-1',
  email: 'parent@example.com',
  role: UserRole.USER,
  status: UserStatus.ACTIVE,
  profile: {
    userId: 'user-1',
    firstName: 'Ana',
    lastName: 'Petrovic',
    displayName: 'Ana P.',
    phoneNumber: null,
    city: 'Belgrade',
    municipality: null,
    addressLine: null,
    bio: null,
  },
};
