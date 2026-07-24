import {
  Controller,
  Get,
  Logger,
  ServiceUnavailableException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Controller('health')
export class HealthController {
  private readonly logger = new Logger(HealthController.name);

  constructor(private readonly prismaService: PrismaService) {}

  @Get()
  getHealth(): { status: 'ok' } {
    return { status: 'ok' };
  }

  @Get('db')
  async getDatabaseHealth(): Promise<{
    status: 'ok';
    database: 'connected';
  }> {
    try {
      await this.prismaService.verifyConnection();
      return { status: 'ok', database: 'connected' };
    } catch (error) {
      this.logger.error(
        'Database health check failed',
        error instanceof Error ? error.stack : undefined,
      );
      throw new ServiceUnavailableException({
        status: 'error',
        database: 'disconnected',
      });
    }
  }
}
