import {
  ForbiddenException,
  HttpStatus,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as _ from 'lodash';
import { compareHash } from 'src/common/utils';
import { BusinessException } from 'src/helper-modules/buisiness-exception';
import {
  IEmailService,
  ISmsService,
} from 'src/modules/communication/services/interfaces';
import { UserDto } from 'src/modules/user/dto';
import { IUserService } from 'src/modules/user/serivces/interfaces';
import {
  ForgetPasswordDto,
  GenerateOtpDto,
  JwtUserData,
  LoginDto,
  OtpLoginDto,
  OtpResponseDto,
  ResetPassTokenDto,
  Tokens,
} from '../../dto';
import { IOtpRepository } from '../../repositories';
import { jwtConstants } from '../../strategies/constants';
import { IAuthService } from '../interfaces/IAuthService';

/////////////////////////////////////////////////////
@Injectable()
export class AuthService implements IAuthService {
  constructor(
    private jwtService: JwtService,
    @Inject(IUserService)
    private readonly userService: IUserService,
    @Inject(ISmsService)
    private readonly smsService: ISmsService,
    @Inject(IEmailService)
    private readonly emailService: IEmailService,
    @Inject(IOtpRepository)
    private otpRepository: IOtpRepository,
  ) {}

  async resetPassword(resetPassTokenDto: ResetPassTokenDto): Promise<boolean> {
    const userDto: UserDto = await this.userService.findOneUser({
      userId: resetPassTokenDto.userId,
      IsActive: true,
    });

    if (_.isEmpty(userDto)) {
      throw new ForbiddenException('User does not exist');
    }

    const passwordMatch: boolean = compareHash(
      resetPassTokenDto.newPassword,
      userDto.password,
    );

    if (passwordMatch) {
      return true; // password changed!
    }

    const status: boolean = await this.userService.resetUserPassword(
      resetPassTokenDto,
    );

    if (status && !_.isEmpty(userDto.mobileNumber)) {
      const passChangedMessage =
        `Hello ${userDto.firstName}, ` +
        `your password has been changed.Your new password is ${resetPassTokenDto.newPassword}`;

      this.smsService.sendSMS(userDto.mobileNumber, passChangedMessage);
    }

    return status;
  }

  async emailResetPasswordLink(
    forgetPasswordDto: ForgetPasswordDto,
  ): Promise<boolean> {
    const userDto: UserDto = await this.userService.findOneUser({
      email: forgetPasswordDto.email,
      IsActive: true,
    });

    if (_.isEmpty(userDto)) {
      throw new ForbiddenException('User does not exist');
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const tokens: Tokens = await this.login(userDto);

    // TODO add email service and send reset password link
    // Note the token must be sent as query parameter and not as url param
    // this is bcoz we can use passport strategy. e.g defined in this repo 'JwtFromQueryParamStrategy'
    const emailSent: boolean = await this.emailService.sendResetPasswordEmail({
      email: userDto.email,
      action_url: `${process.env.FRONTEND_URL}/reset_password_confirm/${userDto.id}?token=${tokens.access_token}`,
    });

    if (!emailSent) {
      throw new Error('Problem encountered while sending email');
    }

    return true;
  }

  async validateUser(loginDto: LoginDto): Promise<UserDto> {
    // find user in db and verify pass which returns userDto
    const userDto: UserDto = await this.userService.findOneUserWithRoleData({
      userName: loginDto.userName,
      IsActive: true,
    });

    if (_.isEmpty(userDto)) {
      throw new ForbiddenException('User does not exist');
    }

    const passwordMatch: boolean = compareHash(
      loginDto.password,
      userDto.password,
    );

    if (!passwordMatch) {
      throw new ForbiddenException('Incorrect username or password!');
    }

    return userDto;
  }

  async login(userDto: UserDto): Promise<Tokens> {
    const tokens = await this.getTokens({
      userId: userDto.id,
      firstName: userDto.firstName,
      lastName: userDto.lastName,
      mobileNumber: userDto.mobileNumber,
      email: userDto.email,
      roles: userDto.roles,
    });

    // compare pass hash from db and if matches generate and update tokens
    // await this.updateRtHash(loginDto.userName, loginDto.userName);
    return tokens;
  }

  async verifyOtp(otpLoginDto: OtpLoginDto): Promise<UserDto> {
    const userDto: UserDto = await this.userService.findOneUser({
      mobileNumber: otpLoginDto.mobileNumber,
      IsActive: true,
    });

    if (_.isEmpty(userDto)) {
      throw new NotFoundException('User does not exist');
    }

    const otpDto = await this.otpRepository.getMostRecentOtp(
      userDto.mobileNumber,
    );

    if (_.isEmpty(otpDto)) {
      throw new ForbiddenException('Incorrect or expired OTP provided!');
    }

    const otpMatch: boolean = otpLoginDto.otp === otpDto.otp;
    if (!otpMatch) {
      throw new ForbiddenException('Incorrect or expired OTP provided!');
    }

    await this.otpRepository.setOtpAsValidated(otpDto);
    return userDto;
  }

  async generateOtp(generateOtpDto: GenerateOtpDto): Promise<OtpResponseDto> {
    const userDto: UserDto = await this.userService.findOneUser({
      mobileNumber: generateOtpDto.mobileNumber,
      IsActive: true,
    });

    if (_.isEmpty(userDto)) {
      throw new ForbiddenException(
        `User does not exist with phone number: ${generateOtpDto.mobileNumber}`,
      );
    }

    const otpResponse: OtpResponseDto = await this.otpRepository.createOtp(
      userDto,
    );

    // Possible null ref exception here for otpResponse.otp
    if (_.isEmpty(otpResponse.otp)) {
      throw new BusinessException(HttpStatus.INTERNAL_SERVER_ERROR, {
        message: 'OTP record not found for the user!',
      });
    }

    const otpSms =
      `Hello ${userDto.firstName}, ` +
      `${otpResponse.otp} is login OTP for your product account. If you have not requested this OTP, please contact product support.`;

    this.smsService.sendSMS(userDto.mobileNumber, otpSms);

    return otpResponse;
  }

  async logout() {
    return { message: 'you have been logged out' };
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async refreshTokens(userId: string, rt: string) {
    //   // find user in db and verify pass which returns userDto
    //   // if (_.IsEmpty(userDto)) { throw new ForbiddenException('Access Denied'); }
    //   // if (_.IsEmpty(userDto.refresh_token)) { throw new ForbiddenException('Access Denied, you need to sign in first'); }
    //   const email = 'userDto.email';
    //   // compare hash of refresh token (rt) with the one stored in db
    //   // if (!rtMatches) { throw new ForbiddenException('Access Denied'); }
    //   // else return token and update token as well
    //   const tokens = await this.getTokens(userId, email);
    //   await this.updateRtHash(userId, email);
    //   return tokens;
    throw new Error('Method not implemented.');
  }

  async updateRtHash(userId: string, email: string): Promise<boolean> {
    // save the token in the database here
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [id, mail] = [userId, email];
    return true;
  }

  private getTokens = async (
    userDataForToken: JwtUserData,
  ): Promise<Tokens> => {
    const [at, rt] = await Promise.all([
      this.jwtService.signAsync(userDataForToken, {
        secret: jwtConstants.at_secret,
        expiresIn: 60 * 60 * 24 * 7, // sec * min * hr * day.....
      }),
      this.jwtService.signAsync(userDataForToken, {
        secret: jwtConstants.rt_secret,
        expiresIn: 60 * 60 * 24 * 7, // sec * min * hr * day.....
      }),
    ]);

    const tokens = new Tokens();
    tokens.access_token = at;
    tokens.refresh_token = rt;
    return tokens;
  };
}
