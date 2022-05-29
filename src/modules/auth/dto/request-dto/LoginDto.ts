import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsString } from 'class-validator';

export class LoginDto {
  constructor(props: LoginDto) {
    Object.assign(this, props);
  }
  @ApiProperty({ name: 'user_name' })
  @Expose({ name: 'user_name' })
  @IsString({ message: "'User Name' must be string" })
  userName: string;

  @ApiProperty({ name: 'password', example: 'Password@1234' })
  @Expose({ name: 'password' })
  password: string;
}
