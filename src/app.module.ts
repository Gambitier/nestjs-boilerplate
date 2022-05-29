import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { MongooseModule } from '@nestjs/mongoose';
import { AwsSdkModule } from 'nest-aws-sdk';
import { TwilioModule } from 'nestjs-twilio';
import {
  auditLogsMongooseModuleConfig,
  businessExceptionConfigs,
  envConfigs,
  mailerModuleConfigs,
  S3ModuleConfig,
  twilioModuleConfig,
} from './configs';
import {
  BusinessExceptionModule,
  ExceptionInterceptor,
} from './helper-modules/buisiness-exception';
import { SuccessResponseInterceptor } from './helper-modules/success-response';
import { AuthModule } from './modules/auth/auth.module';
import { JwtGuard, RolesGuard } from './modules/auth/common';
import { CommunicationModule } from './modules/communication/communication.module';

@Module({
  imports: [
    ConfigModule.forRoot(envConfigs),
    BusinessExceptionModule.forRootAsync(businessExceptionConfigs),
    TwilioModule.forRootAsync(twilioModuleConfig),
    MailerModule.forRootAsync(mailerModuleConfigs),
    MongooseModule.forRootAsync(auditLogsMongooseModuleConfig),
    AwsSdkModule.forRootAsync(S3ModuleConfig),
    CommunicationModule,
    AuthModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: SuccessResponseInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ExceptionInterceptor,
    },
  ],
})
export class AppModule {
  onModuleInit(): void {
    console.log('Initializing server modules 📡 ');
  }

  onApplicationBootstrap(): void {
    console.log('Initialized server, waiting for requests 🚀');
  }
}
