import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from 'src/modules/user/user.module';
import { PrismaService } from 'src/prisma.service';
import { CommunicationModule } from '../communication/communication.module';
import { AuthController } from './AuthController';
import { AuthServiceProvider, OtpRepoProvider } from './providers';
import {
  JwtFromQueryParamStrategy,
  JwtStrategy,
  LocalStrategy,
  OTPStrategy,
} from './strategies';

@Module({
  imports: [JwtModule.register({}), UserModule, CommunicationModule],
  controllers: [AuthController],
  providers: [
    PrismaService,
    AuthServiceProvider,
    OtpRepoProvider,
    JwtStrategy,
    LocalStrategy,
    OTPStrategy,
    JwtFromQueryParamStrategy,
  ],
})
export class AuthModule {}
