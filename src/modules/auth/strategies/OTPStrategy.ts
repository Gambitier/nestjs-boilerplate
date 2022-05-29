import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { IAuthService } from '../services';
import { OtpLoginDto } from '../dto';
import { UserDto } from 'src/modules/user/dto';
import { plainToClass } from 'class-transformer';

@Injectable()
export class OTPStrategy extends PassportStrategy(Strategy, 'OTPStrategy') {
  constructor(
    @Inject(IAuthService)
    private readonly authService: IAuthService,
  ) {
    super({
      usernameField: 'phone',
      passwordField: 'otp',
    });
  }

  async validate(phone: string, otp: string): Promise<any> {
    const loginDto = plainToClass(OtpLoginDto, {
      phone: phone,
      otp: otp,
    });
    const user: UserDto = await this.authService.verifyOtp(loginDto);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
