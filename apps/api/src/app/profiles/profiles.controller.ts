import { Body, Controller, Get, Patch, UseGuards } from '@nestjs/common';
import { MyUserProfile } from '@babyshare/types';
import { CurrentUserPayload } from '../auth/current-user.decorator';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { JwtUserPayload } from '../auth/jwt-user-payload';
import { UpdateMyUserProfileRequestDto } from './dto/update-my-user-profile-request.dto';
import { ProfilesService } from './profiles.service';

@Controller('profiles')
@UseGuards(JwtAuthGuard)
export class ProfilesController {
  constructor(private readonly profilesService: ProfilesService) {}

  @Get('me')
  getMe(@CurrentUserPayload() user: JwtUserPayload): Promise<MyUserProfile> {
    return this.profilesService.getMyProfile(user.sub);
  }

  @Patch('me')
  updateMe(
    @CurrentUserPayload() user: JwtUserPayload,
    @Body() request: UpdateMyUserProfileRequestDto,
  ): Promise<MyUserProfile> {
    return this.profilesService.updateMyProfile(user.sub, request);
  }
}
