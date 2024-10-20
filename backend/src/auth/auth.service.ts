import { Injectable, UnauthorizedException, ConflictException, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../users/user.service';
import { UserGetDto } from '../users/dtos/user-get.dto';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../../prisma/prisma.service';
import { plainToInstance } from 'class-transformer';
import { UserCreateDto } from '../users/dtos/user-create.dto';
import { UserLoginDto } from './dtos/user-login.dto';
import { AuthResponseDto } from './dtos/auth-response.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private prisma: PrismaService,
  ) {}

  // Générer un access token et un refresh token
  private generateTokens(user: UserGetDto): { accessToken: string, refreshToken: string } {
    const payload = { email: user.email, sub: user.id, role: user.role.name };
    const accessToken = this.jwtService.sign(payload, { expiresIn: '15m' });
    const refreshToken = this.jwtService.sign(payload, { expiresIn: '7d' });
    return { accessToken, refreshToken };
  }

  // Connexion avec génération de tokens
  async login(data: UserLoginDto): Promise<AuthResponseDto> {
    const userExist = await this.prisma.user.findFirst({
      where: { email: data.email },
      include: { role: true },
    });
    if (!userExist) {
      return {
        user: null,
        accessToken: null,
        refreshToken: null,
        isSuccess: false,
        message: 'Mail non trouvé',
      };
    }

    const isPasswordValid = await bcrypt.compare(data.password, userExist.password);
    if (!isPasswordValid) {
      return {
        user: null,
        accessToken: null,
        refreshToken: null,
        isSuccess: false,
        message: 'Mot de passe incorrect',
      };
    }

    const user = plainToInstance(UserGetDto, userExist, { excludeExtraneousValues: true });
    const tokens = this.generateTokens(user);

    return {
      user,
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
      isSuccess: true,
      message: 'Login successful',
    };
  }

  // Inscription avec génération de tokens
  async register(data: UserCreateDto): Promise<AuthResponseDto> {
    const userExist = await this.userService.getByCriteria({ email: data.email });
    if (userExist) {
      return {
        user: null,
        accessToken: null,
        refreshToken: null,
        isSuccess: false,
        message: 'Mail déjà utilisé',
      };
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);
    const newUser = await this.prisma.user.create({
      data: {
        firstname: data.firstname,
        lastname: data.lastname,
        email: data.email,
        password: hashedPassword,
        gender: data.gender,
        age: data.age,
        role: {
          connect: {
              id: data.roleId,
          },
        },
      },
      include: { role: true },
    });
    const user = plainToInstance(UserGetDto, newUser, { excludeExtraneousValues: true });
    const tokens = this.generateTokens(user);

    return {
      user,
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
      isSuccess: true,
      message: 'Registration successful',
    };
  }

  // Vérifier si le token est valide
  async isTokenValid(token: string): Promise<boolean> {
    try {
      this.jwtService.verify(token);
      return true;
    } catch {
      return false;
    }
  }

  // Récupérer l'utilisateur à partir du token
  async getUserByToken(token: string): Promise<UserGetDto | null> {
    try {
      const decoded = this.jwtService.verify(token);
      return this.userService.getById(decoded.sub);
    } catch {
      return null;
    }
  }

  async refreshAccessToken(refreshToken: string): Promise<AuthResponseDto> {
    try {
      const decoded = this.jwtService.verify(refreshToken);
      const userExist = await this.prisma.user.findFirst({
        where: { id: decoded.sub },
        include: { role: true },
      });

      if (!userExist) {
        return {
          user: null,
          accessToken: null,
          refreshToken: null,
          isSuccess: false,
          message: 'Invalid refresh token',
        };
      }

      const user = plainToInstance(UserGetDto, userExist, { excludeExtraneousValues: true });
      const tokens = this.generateTokens(user);
      return {
        user,
        accessToken: tokens.accessToken,
        refreshToken: tokens.refreshToken,
        isSuccess: true,
        message: 'Token refreshed successfully',
      };

    } catch {
      return {
        user: null,
        accessToken: null,
        refreshToken: null,
        isSuccess: false,
        message: 'Invalid refresh token',
      };
    }
  }

}
