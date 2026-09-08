import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Prisma } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { DatabaseService } from '../../database/database.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

const BCRYPT_SALT_ROUNDS = 12;

@Injectable()
export class AuthService {
  constructor(
    private readonly database: DatabaseService,
    private readonly jwtService: JwtService,
  ) {}

  async register(dto: RegisterDto) {
    const password = await bcrypt.hash(dto.password, BCRYPT_SALT_ROUNDS);

    try {
      const user = await this.database.user.create({
        data: {
          username: dto.username,
          passwordHash: password,
          email: dto.email,
        },
        omit: { passwordHash: true },
      });

      return {
        user,
        accessToken: await this.createAccessToken(user.id, user.username),
      };
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        throw new ConflictException('Username or email is already in use');
      }

      throw error;
    }
  }

  async login(dto: LoginDto) {
    const user = await this.database.user.findUnique({
      where: { username: dto.username },
    });

    if (!user || !user.isActive) {
      throw new UnauthorizedException('Invalid username or password');
    }

    const passwordMatches = await bcrypt.compare(dto.password, user.passwordHash);

    if (!passwordMatches) {
      throw new UnauthorizedException('Invalid username or password');
    }

    const { passwordHash: _passwordHash, ...safeUser } = user;

    return {
      user: safeUser,
      accessToken: await this.createAccessToken(user.id, user.username),
    };
  }

  private createAccessToken(userId: string, username: string) {
    return this.jwtService.signAsync({ sub: userId, username });
  }
}
