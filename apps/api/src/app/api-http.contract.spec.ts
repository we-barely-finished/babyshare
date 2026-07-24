import { INestApplication, ValidationPipe } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Test } from '@nestjs/testing';
import { AuthSession, MyUser, UserRole, UserStatus } from '@babyshare/types';
import request from 'supertest';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { ProfilesController } from './profiles/profiles.controller';
import { ProfilesService } from './profiles/profiles.service';
import { UsersService } from './users/users.service';

describe('API HTTP contracts', () => {
  let app: INestApplication;
  let http: ReturnType<typeof request>;
  const authService = {
    login: jest.fn<Promise<AuthSession>, [unknown]>(),
    register: jest.fn<Promise<MyUser>, [unknown]>(),
  };
  const usersService = {
    findUserWithProfileById: jest.fn(),
    updateMyUserProfile: jest.fn(),
  };
  const jwtService = {
    verifyAsync: jest.fn(),
  };

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [AuthController, ProfilesController],
      providers: [
        { provide: AuthService, useValue: authService },
        ProfilesService,
        { provide: UsersService, useValue: usersService },
        { provide: JwtService, useValue: jwtService },
        JwtAuthGuard,
      ],
    }).compile();

    app = moduleRef.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        transform: true,
        whitelist: true,
        forbidNonWhitelisted: true,
      }),
    );
    app.setGlobalPrefix('api');
    await app.init();
    http = request(app.getHttpServer());
  });

  beforeEach(() => {
    jest.clearAllMocks();
    authService.login.mockResolvedValue(authSession);
    authService.register.mockResolvedValue(myUser);
    jwtService.verifyAsync.mockResolvedValue({
      sub: 'user-1',
      email: 'parent@example.com',
      role: UserRole.USER,
    });
    usersService.findUserWithProfileById.mockResolvedValue(accountWithProfile);
    usersService.updateMyUserProfile.mockResolvedValue(myUser.profile);
  });

  afterAll(async () => {
    await app.close();
  });

  it('returns 200 for login', async () => {
    const response = await http
      .post('/api/auth/login')
      .send({ email: 'parent@example.com', password: 'supersecret' });

    expect(response.status).toBe(200);
  });

  it('returns 201 for registration', async () => {
    const response = await http
      .post('/api/auth/register')
      .send(validRegistration);

    expect(response.status).toBe(201);
  });

  it.each(['firstName', 'lastName', 'displayName', 'city'])(
    'rejects null for required profile field %s',
    async (field) => {
      const response = await authenticatedPatch({ [field]: null });

      expect(response.status).toBe(400);
    },
  );

  it.each(['phoneNumber', 'municipality', 'addressLine', 'bio'])(
    'accepts null for nullable profile field %s',
    async (field) => {
      const response = await authenticatedPatch({ [field]: null });

      expect(response.status).toBe(200);
      expect(usersService.updateMyUserProfile).toHaveBeenCalledWith('user-1', {
        [field]: null,
      });
    },
  );

  it('rejects unknown profile fields', async () => {
    const response = await authenticatedPatch({ email: 'new@example.com' });

    expect(response.status).toBe(400);
  });

  it('rejects an empty profile patch', async () => {
    const response = await authenticatedPatch({});

    expect(response.status).toBe(400);
  });

  it('returns 401 for a protected profile route without a bearer token', async () => {
    const response = await http.get('/api/profiles/me');

    expect(response.status).toBe(401);
  });

  function authenticatedPatch(body: object) {
    return http
      .patch('/api/profiles/me')
      .set('authorization', 'Bearer valid-token')
      .send(body);
  }
});

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

const authSession: AuthSession = {
  accessToken: 'signed.jwt.token',
  tokenType: 'Bearer',
  user: myUser,
};

const accountWithProfile = {
  id: myUser.id,
  email: myUser.email,
  role: myUser.role,
  status: myUser.status,
  profile: myUser.profile,
};

const validRegistration = {
  email: 'parent@example.com',
  password: 'supersecret',
  firstName: 'Ana',
  lastName: 'Petrovic',
  displayName: 'Ana P.',
  city: 'Belgrade',
};
