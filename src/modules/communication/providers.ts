import { Provider } from '@nestjs/common';
import { EmailService, SmsService } from './services';
import { IEmailService, ISmsService } from './services/interfaces';

export const SmsServiceProvider: Provider = {
  provide: ISmsService,
  useClass: SmsService,
};

export const EmailServiceProvider: Provider = {
  provide: IEmailService,
  useClass: EmailService,
};
