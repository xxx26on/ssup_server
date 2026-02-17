import { Controller, Post, Body, ValidationPipe, Get, UseGuards, Req, Res } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import type { Response } from 'express';
import { AuthService } from './auth.service';
import { RegisterDto, LoginDto } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('register')
  async register(@Body(new ValidationPipe()) registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @Post('login')
  async login(@Body(new ValidationPipe()) loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleAuth(@Req() req) { }

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  async googleAuthRedirect(@Req() req, @Res() res: Response) {
    const { access_token, user } = await this.authService.validateSocialUser(req.user);
    // Redirect to frontend with token
    const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3000';
    res.redirect(`${frontendUrl}/auth/social-callback?token=${access_token}&email=${user.email}&name=${encodeURIComponent(user.name || '')}&role=${user.role}&avatar=${encodeURIComponent(user.avatar || '')}&id=${user.id}`);
  }

  @Get('facebook')
  @UseGuards(AuthGuard('facebook'))
  async facebookAuth(@Req() req) { }

  @Get('facebook/callback')
  @UseGuards(AuthGuard('facebook'))
  async facebookAuthRedirect(@Req() req, @Res() res: Response) {
    const { access_token, user } = await this.authService.validateSocialUser(req.user);
    // Redirect to frontend with token
    const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3000';
    res.redirect(`${frontendUrl}/auth/social-callback?token=${access_token}&email=${user.email}&name=${encodeURIComponent(user.name || '')}&role=${user.role}&avatar=${encodeURIComponent(user.avatar || '')}&id=${user.id}`);
  }
}

