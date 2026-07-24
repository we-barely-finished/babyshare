import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import {
  MyUserProfile,
  UpdateMyUserProfileRequest,
  UserStatus,
} from '@babyshare/types';
import { mapMyUserProfile } from '../users/user.mapper';
import { UsersService } from '../users/users.service';

@Injectable()
export class ProfilesService {
  constructor(private readonly usersService: UsersService) {}

  async getMyProfile(userId: string): Promise<MyUserProfile> {
    const user = await this.getAllowedUser(userId);

    if (!user.profile) {
      throw new NotFoundException('User profile not found');
    }

    return mapMyUserProfile(user.profile);
  }

  async updateMyProfile(
    userId: string,
    request: UpdateMyUserProfileRequest,
  ): Promise<MyUserProfile> {
    const user = await this.getAllowedUser(userId);

    if (!user.profile) {
      throw new NotFoundException('User profile not found');
    }

    if (Object.keys(request).length === 0) {
      throw new BadRequestException('At least one profile field is required');
    }

    const updatedProfile = await this.usersService.updateMyUserProfile(
      userId,
      request,
    );

    if (!updatedProfile) {
      throw new NotFoundException('User profile not found');
    }

    return updatedProfile;
  }

  private async getAllowedUser(userId: string) {
    const user = await this.usersService.findUserWithProfileById(userId);

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    if (
      user.status === UserStatus.BLOCKED ||
      user.status === UserStatus.DELETED
    ) {
      throw new ForbiddenException('User account cannot access this resource');
    }

    return user;
  }
}
