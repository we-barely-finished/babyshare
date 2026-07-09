import { Body, Controller, Post } from '@nestjs/common';
import { MyUser } from '@babyshare/types';
import { AuthService } from './auth.service';
import { RegisterRequestDto } from './dto/register-request.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body() request: RegisterRequestDto): Promise<MyUser> {
    return this.authService.register(request);
  }
}
