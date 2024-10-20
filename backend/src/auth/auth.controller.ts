import { Controller, Post, Body, Get, Headers, Res, Req, HttpCode } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserGetDto } from '../users/dtos/user-get.dto';
import { Response, Request } from 'express';
import { UserCreateDto } from '../users/dtos/user-create.dto';
import { UserLoginDto } from './dtos/user-login.dto';
import { AuthResponseDto } from './dtos/auth-response.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(200)
  @Post('login')
  async login(
    @Body() loginData: UserLoginDto,
    @Res({ passthrough: true }) res: Response
  ): Promise<AuthResponseDto> {
    const response = await this.authService.login(loginData);

    if (response.isSuccess) {
      res.cookie('refreshToken', response.refreshToken, { httpOnly: true, secure: false });
    }

    return response;
  }

  @HttpCode(201)
  @Post('register')
  async register(
    @Body() registerData: UserCreateDto,
    @Res({ passthrough: true }) res: Response
  ): Promise<AuthResponseDto> {
    const response = await this.authService.register(registerData);

    if (response.isSuccess) {
      res.cookie('refreshToken', response.refreshToken, { httpOnly: true, secure: false });
    }

    return response;
  }

  @Post('refresh')
  async refresh(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response
  ): Promise<AuthResponseDto> {
    const refreshToken = req.cookies['refreshToken'];
    const response = await this.authService.refreshAccessToken(refreshToken);

    if (response.isSuccess) {
      res.cookie('refreshToken', response.refreshToken, { httpOnly: true, secure: false });
    }

    return response;
  }

}
