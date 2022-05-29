import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsDefined, IsString } from 'class-validator';
import { sanitizePhoneNumber } from 'src/common/utils';

export class OtpLoginDto {
  constructor(props: OtpLoginDto) {
    Object.assign(this, props);
  }

  @ApiProperty({ name: 'mobileNumber' })
  @IsString({ message: 'Mobile Number must be provided!' })
  @Transform(({ value }) => sanitizePhoneNumber(value), { toClassOnly: true })
  mobileNumber: string;

  @ApiProperty({ name: 'otp' })
  @IsDefined({ message: "'otp' is missing" })
  otp: string;
}
