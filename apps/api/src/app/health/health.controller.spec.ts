import { Logger, ServiceUnavailableException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../prisma/prisma.service';
import { HealthController } from './health.controller';

describe('HealthController', () => {
  let controller: HealthController;
  let prismaService: { verifyConnection: jest.Mock<Promise<void>, []> };

  beforeAll(async () => {
    prismaService = {
      verifyConnection: jest.fn(),
    };

    const testingModule: TestingModule = await Test.createTestingModule({
      controllers: [HealthController],
      providers: [
        {
          provide: PrismaService,
          useValue: prismaService,
        },
      ],
    }).compile();

    controller = testingModule.get(HealthController);
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('returns the existing API health response', () => {
    expect(controller.getHealth()).toEqual({ status: 'ok' });
  });

  it('returns the existing connected database response', async () => {
    prismaService.verifyConnection.mockResolvedValue(undefined);

    await expect(controller.getDatabaseHealth()).resolves.toEqual({
      status: 'ok',
      database: 'connected',
    });
  });

  it('logs database failures and returns the safe unavailable response', async () => {
    const databaseError = new Error('connection details');
    const loggerError = jest
      .spyOn(Logger.prototype, 'error')
      .mockImplementation(() => undefined);
    prismaService.verifyConnection.mockRejectedValue(databaseError);

    try {
      await controller.getDatabaseHealth();
      throw new Error('Expected database health check to fail');
    } catch (error) {
      expect(error).toBeInstanceOf(ServiceUnavailableException);

      if (!(error instanceof ServiceUnavailableException)) {
        throw error;
      }

      expect(error.getStatus()).toBe(503);
      expect(error.getResponse()).toEqual({
        status: 'error',
        database: 'disconnected',
      });
    }
    expect(loggerError).toHaveBeenCalledWith(
      'Database health check failed',
      databaseError.stack,
    );
  });
});
