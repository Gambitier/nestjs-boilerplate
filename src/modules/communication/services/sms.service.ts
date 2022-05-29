import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectTwilio, TwilioClient } from 'nestjs-twilio';
import { sanitizePhoneNumber } from 'src/common/utils';
import { ISmsService } from './interfaces/ISmsService';

@Injectable()
export class SmsService implements ISmsService {
  public constructor(
    private readonly configService: ConfigService,
    @InjectTwilio() private readonly client: TwilioClient,
  ) {}

  async sendSMS(targetPhoneNumber: string, body: string) {
    targetPhoneNumber = sanitizePhoneNumber(targetPhoneNumber);
    const msg = await this.client.messages.create({
      body: body,
      from: this.configService.get<string>('TWILLIO_PHONE_NUMBER'),
      to: `+91${targetPhoneNumber}`,
      statusCallback: this.configService.get<string>('TWILLIO_SMS_WEBHOOK'),
    });
    return msg;
  }
}
