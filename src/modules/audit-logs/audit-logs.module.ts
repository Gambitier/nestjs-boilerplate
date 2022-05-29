import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuditConnectionName } from 'src/configs';
import { AuditServiceProvider } from './providers';

@Module({
  imports: [
    MongooseModule.forFeature(
      [
        {
          name: 'TableName',
          schema: {},
        },
      ],
      AuditConnectionName,
    ),
  ],
  controllers: [],
  providers: [AuditServiceProvider],
  exports: [AuditServiceProvider],
})
export class AuditLogsModule {}
