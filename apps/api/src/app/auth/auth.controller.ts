import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthSession, MyUser } from '@babyshare/types';
import { AuthService } from './auth.service';
import { CurrentUserPayload } from './current-user.decorator';
import { LoginRequestDto } from './dto/login-request.dto';
import { RegisterRequestDto } from './dto/register-request.dto';
import { JwtAuthGuard } from './jwt-auth.guard';
import { JwtUserPayload } from './jwt-user-payload';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body() request: RegisterRequestDto): Promise<MyUser> {
    return this.authService.register(request);
  }

  @Post('login')
  login(@Body() request: LoginRequestDto): Promise<AuthSession> {
    return this.authService.login(request);
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  getMe(@CurrentUserPayload() user: JwtUserPayload): Promise<MyUser> {
    return this.authService.getMe(user.sub);
  }
}
