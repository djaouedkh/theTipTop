import { Controller, Post, Body, Get, Headers, Res, Req, HttpCode, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserGetDto } from '../users/dtos/user-get.dto';
import { Response, Request } from 'express';
import { UserCreateDto } from '../users/dtos/user-create.dto';
import { UserLoginDto } from './dtos/user-login.dto';
import { AuthResponseDto } from './dtos/auth-response.dto';
import { AuthGuard } from '@nestjs/passport';
import { AuthGoogleResponseDto } from './external-auth/dtos/auth-google-response.dto';
import { UserLoginGoogleDto } from './external-auth/dtos/user-login-google.dto';

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

  @HttpCode(200)
  @Post('login-post-google-valid')
  async loginPostGoogleValid(
    @Body() loginData: UserLoginGoogleDto,
    @Res({ passthrough: true }) res: Response
  ): Promise<AuthResponseDto> {
    const response = await this.authService.loginPostGoogleValid(loginData);

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

  // GOOGLE AUTHENTICATION
  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleAuth() {
    // Cette méthode sera vide, Passport redirigera automatiquement l'utilisateur vers Google
  }

  // Callback après l'authentification par Google
  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  googleAuthRedirect(@Req() req: Request, @Res() res: Response) {
    const response = req.user as AuthGoogleResponseDto;
    res.redirect(`http://localhost:4200/auth/callback?isSuccess=${response.isSuccess}&isGoogleRegister=${response.isGoogleRegister}&email=${response.email}`);
  }

}
