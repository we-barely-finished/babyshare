import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';

describe('AppController', () => {
  let app: TestingModule;
  let prismaService: { verifyConnection: jest.Mock<Promise<void>, []> };

  beforeAll(async () => {
    prismaService = {
      verifyConnection: jest.fn(),
    };

    app = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        AppService,
        {
          provide: PrismaService,
          useValue: prismaService,
        },
      ],
    }).compile();
  });

  describe('getData', () => {
    it('should return "Hello API"', () => {
      const appController = app.get<AppController>(AppController);
      expect(appController.getData()).toEqual({ message: 'Hello API' });
    });
  });

  describe('getHealth', () => {
    it('should return ok status', () => {
      const appController = app.get<AppController>(AppController);
      expect(appController.getHealth()).toEqual({ status: 'ok' });
    });
  });

  describe('getDatabaseHealth', () => {
    it('should return connected database status', async () => {
      prismaService.verifyConnection.mockResolvedValue(undefined);

      const appController = app.get<AppController>(AppController);
      await expect(appController.getDatabaseHealth()).resolves.toEqual({
        status: 'ok',
        database: 'connected',
      });
    });

    it('should throw when the database is unavailable', async () => {
      prismaService.verifyConnection.mockRejectedValue(
        new Error('database unavailable'),
      );

      const appController = app.get<AppController>(AppController);
      await expect(appController.getDatabaseHealth()).rejects.toThrow(
        'Service Unavailable',
      );
    });
  });
});
