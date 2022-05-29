import { ConfigModule, ConfigService } from '@nestjs/config';

export const twilioModuleConfig = {
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: async (cfg: ConfigService) => ({
    accountSid: cfg.get('TWILIO_ACCOUNT_SID'),
    authToken: cfg.get('TWILIO_AUTH_TOKEN'),
  }),
};
