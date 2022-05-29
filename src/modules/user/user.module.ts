import { Module } from '@nestjs/common';
import { UserServiceProvider } from './providers';

@Module({
  imports: [],
  controllers: [],
  providers: [UserServiceProvider],
  exports: [UserServiceProvider],
})
export class UserModule {}
