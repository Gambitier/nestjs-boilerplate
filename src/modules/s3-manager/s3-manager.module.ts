import { Module } from '@nestjs/common';
import { S3ManagerServiceProvider } from './providers';

@Module({
  imports: [],
  providers: [S3ManagerServiceProvider],
  exports: [S3ManagerServiceProvider],
})
export class S3ManagerModule {}
