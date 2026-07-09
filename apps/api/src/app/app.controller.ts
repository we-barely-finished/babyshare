import { Controller, Get, ServiceUnavailableException } from '@nestjs/common';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly prismaService: PrismaService,
  ) {}

  @Get()
  getData() {
    return this.appService.getData();
  }

  @Get('health')
  getHealth() {
    return { status: 'ok' };
  }

  @Get('health/db')
  async getDatabaseHealth() {
    try {
      await this.prismaService.verifyConnection();
      return { status: 'ok', database: 'connected' };
    } catch {
      throw new ServiceUnavailableException({
        status: 'error',
        database: 'disconnected',
      });
    }
  }
}
