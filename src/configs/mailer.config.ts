import { EjsAdapter } from '@nestjs-modules/mailer/dist/adapters/ejs.adapter';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as path from 'path';

export const mailerModuleConfigs = {
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: async (cfg: ConfigService) => ({
    // alternative => transport:'smtps://user@domain.com:pass@smtp.domain.com',
    transport: {
      host: cfg.get<string>('EMAIL_HOST'),
      port: cfg.get<number>('EMAIL_PORT'),
      ignoreTLS: false,
      secure: false,
      auth: {
        user: cfg.get<string>('EMAIL_USERNAME'),
        pass: cfg.get<string>('EMAIL_PASSWORD'),
      },
    },
    defaults: {
      // '"nest-modules" <modules@nestjs.com>',
      from: cfg.get<string>('EMAIL_FROM'),
    },
    preview: cfg.get<string>('EMAIL_PREVIEWMODE') == 'true',
    template: {
      dir: path.join(
        process.cwd(),
        'dist',
        'src',
        'common',
        'assets',
        'email-templates',
      ),
      adapter: new EjsAdapter({
        // Control over inline-css in default adapters
        // https://nest-modules.github.io/mailer/docs/mailer.html#control-over-inline-css-in-default-adapters
        inlineCssEnabled: true,
      }),
      options: {
        strict: false,
      },
    },
  }),
};
