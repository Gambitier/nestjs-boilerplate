import { Module } from '@nestjs/common';
import { CommunicationController } from './controller/CommunicationController';
import { EmailServiceProvider, SmsServiceProvider } from './providers';

@Module({
  imports: [],
  controllers: [CommunicationController],
  providers: [SmsServiceProvider, EmailServiceProvider],
  exports: [SmsServiceProvider, EmailServiceProvider],
})
export class CommunicationModule {}
