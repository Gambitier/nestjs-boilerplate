import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuditConnectionName } from 'src/configs';

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
  providers: [],
  exports: [],
})
export class ActivitiesModule {}
