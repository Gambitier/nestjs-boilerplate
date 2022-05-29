import { ConfigModule, ConfigService } from '@nestjs/config';
import { Credentials, S3 } from 'aws-sdk';

export const S3ModuleConfig = {
  defaultServiceOptions: {
    useFactory: (cfg: ConfigService) => {
      return {
        region: cfg.get('AWS_REGION'),
        credentials: new Credentials({
          accessKeyId: cfg.get('AWS_ACCESS_KEY_ID'),
          secretAccessKey: cfg.get('AWS_ACCESS_KEY_SECRET'),
        }),
      };
    },
    imports: [ConfigModule],
    inject: [ConfigService],
  },
  services: [S3],
};
