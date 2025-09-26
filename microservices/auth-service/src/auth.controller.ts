import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { AdminGuard } from './admin.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  login(@Body() body: { email: string; password: string }) {
    return this.authService.login(body);
  }

  @Post('register')
  @UseGuards(JwtAuthGuard, AdminGuard)
  register(@Body() body: { email: string; password: string; name: string; role?: string }) {
    return this.authService.register(body);
  }

  @Post('verify')
  verify(@Body() body: { token: string }) {
    return this.authService.verifyToken(body.token);
  }
}
