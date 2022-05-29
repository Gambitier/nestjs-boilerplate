import { Exclude, Expose, Type } from 'class-transformer';
import { IsString } from 'class-validator';

export class OtpResponseDto {
  constructor(props: OtpResponseDto) {
    Object.assign(this, props);
  }
  @Exclude()
  id: string;

  @Expose({ name: 'userName' })
  @IsString()
  userName: string;

  @Expose({ name: 'mobileNumber' })
  @IsString()
  mobileNumber: string;

  @Exclude({ toClassOnly: false, toPlainOnly: true })
  otp: string;

  @Expose({ name: 'validFrom' })
  @Type(() => Date)
  validFrom: Date;

  @Expose({ name: 'validTo' })
  @Type(() => Date)
  validTo: Date;
}
