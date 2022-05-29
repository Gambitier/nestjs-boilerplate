import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModuleAsyncOptions } from '@nestjs/mongoose';

export const AuditConnectionName = 'auditlogs';

export const auditLogsMongooseModuleConfig: MongooseModuleAsyncOptions = {
  imports: [ConfigModule],
  inject: [ConfigService],
  connectionName: AuditConnectionName,
  useFactory: async (configService: ConfigService) => ({
    uri: configService.get<string>('MONGODB_URL'),
  }),
};
