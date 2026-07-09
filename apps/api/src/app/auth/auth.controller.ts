import { Body, Controller, Post } from '@nestjs/common';
import { AuthSession, MyUser } from '@babyshare/types';
import { AuthService } from './auth.service';
import { LoginRequestDto } from './dto/login-request.dto';
import { RegisterRequestDto } from './dto/register-request.dto';

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
}
