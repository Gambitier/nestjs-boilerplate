import { UserDto } from 'src/modules/user/dto';
import {
  ForgetPasswordDto,
  GenerateOtpDto,
  LoginDto,
  OtpLoginDto,
  OtpResponseDto,
  ResetPassTokenDto,
  Tokens,
} from '../../dto';

export const IAuthService = Symbol('IAuthService');

export interface IAuthService {
  resetPassword(resetPasswordDto: ResetPassTokenDto): Promise<boolean>;

  emailResetPasswordLink(
    forgetPasswordDto: ForgetPasswordDto,
  ): Promise<boolean>;

  validateUser(loginDto: LoginDto): Promise<UserDto>;

  login(userDto: UserDto): Promise<Tokens>;

  verifyOtp(user: OtpLoginDto): Promise<UserDto>;

  generateOtp(user: GenerateOtpDto): Promise<OtpResponseDto>;

  logout();

  refreshTokens(userId: string, rt: string);
}
