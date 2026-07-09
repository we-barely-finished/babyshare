import { ConflictException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { MyUser, UserRole, UserStatus } from '@babyshare/types';
import * as argon2 from 'argon2';
import {
  CreateUserWithProfileInput,
  UsersService,
} from '../users/users.service';
import { AuthService } from './auth.service';
import { RegisterRequestDto } from './dto/register-request.dto';

jest.mock('argon2', () => ({
  hash: jest.fn(),
}));

describe('AuthService', () => {
  let authService: AuthService;
  let usersService: {
    createUserWithProfile: jest.Mock<Promise<MyUser>, [CreateUserWithProfileInput]>;
  };

  beforeEach(() => {
    usersService = {
      createUserWithProfile: jest.fn(),
    };
    authService = new AuthService(usersService as unknown as UsersService);
    jest.mocked(argon2.hash).mockResolvedValue('hashed-password');
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
});
