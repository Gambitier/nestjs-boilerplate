import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsString } from 'class-validator';
import { sanitizePhoneNumber } from 'src/common/utils';

export class GenerateOtpDto {
  @ApiProperty({ name: 'mobileNumber' })
  @IsString()
  @Transform(({ value }) => sanitizePhoneNumber(value), { toClassOnly: true })
  mobileNumber: string;
}
