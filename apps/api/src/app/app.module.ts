import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { HealthModule } from './health/health.module';
import { ProfilesModule } from './profiles/profiles.module';

@Module({
  imports: [HealthModule, AuthModule, ProfilesModule],
})
export class AppModule {}
