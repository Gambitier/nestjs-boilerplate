import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsEmail } from 'class-validator';

export class ForgetPasswordDto {
  @ApiProperty({ name: 'email' })
  @Expose({ name: 'email' })
  @IsEmail()
  email: string;
}
