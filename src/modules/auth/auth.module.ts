import 'dotenv/config';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { DatabaseModule } from '../../database/database.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

export function getJwtSecret(): string {
  return process.env.JWT_SECRET ?? 'dev-secret-key-change-me';
}

const jwtSecret = getJwtSecret();

@Module({
  imports: [
    DatabaseModule,
    JwtModule.register({
      secret: jwtSecret,
      signOptions: { expiresIn: '1d' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
