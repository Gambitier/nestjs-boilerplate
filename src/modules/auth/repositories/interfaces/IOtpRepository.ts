import { UserDto } from 'src/modules/user/dto';
import { OtpResponseDto } from '../../dto';

export interface IOtpRepository {
  setOtpAsValidated(otpDto: OtpResponseDto): Promise<boolean>;

  getMostRecentOtp(phoneWork: string): Promise<OtpResponseDto>;

  createOtp(userDto: UserDto): Promise<OtpResponseDto>;
}

export const IOtpRepository = Symbol('IOtpRepository');
