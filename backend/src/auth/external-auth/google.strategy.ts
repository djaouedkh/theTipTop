import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { Injectable } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { AuthResponseDto } from '../dtos/auth-response.dto';
import { PrismaService } from '../../../prisma/prisma.service';
import { plainToInstance } from 'class-transformer';
import { UserGetDto } from '../../users/dtos/user-get.dto';
import { AuthGoogleResponseDto } from './dtos/auth-google-response.dto';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(
    private authService: AuthService,
    private prisma: PrismaService,
  ) {
    super({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: 'http://localhost:3000/api/auth/google/callback',
      scope: ['email', 'profile'],
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: any, done: VerifyCallback): Promise<any> {
    console.log('2');
    console.log('profile', profile);
    const { name, emails } = profile;

    // Vérifier si l'utilisateur existe dans la base de données via AuthService
    let userExist = await this.prisma.user.findUnique({
      where: {
        email: emails[0].value,
      },
    });

    console.log('3');
    console.log('userExist', userExist);
    if (!userExist) {
      console.log('3.1: enregistré');
      const response: AuthGoogleResponseDto = {
        email: emails[0].value,
        isSuccess: true,
        isGoogleRegister: true,
      };
      return done(null, response);
    }
    console.log('3.2: connecté');

    // Retourner les informations pour le frontend
    const response: AuthGoogleResponseDto = {
      email: emails[0].value,
      isSuccess: true,
      isGoogleRegister: false,
    };

    done(null, response);
  }
}
