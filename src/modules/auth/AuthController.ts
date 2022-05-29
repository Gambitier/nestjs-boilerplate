import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Inject,
  Param,
  ParseUUIDPipe,
  Post,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { SuccessApiResponse } from 'src/common/types';
import {
  AllowAnonymous,
  JwtQueryParamGuard,
  LocalAuthGuard,
  OTPAuthGuard,
} from './common';
import {
  ChangePasswordDto,
  ForgetPasswordDto,
  GenerateOtpDto,
  ResetPassTokenDto,
  Tokens,
} from './dto';
import { IAuthService } from './services';

@ApiBearerAuth()
@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    @Inject(IAuthService)
    private readonly authService: IAuthService,
  ) {}

  @AllowAnonymous() // pass jwt authentication
  @UseGuards(LocalAuthGuard) // but authorize with username and pass
  @HttpCode(HttpStatus.OK)
  @Post('/login')
  async logIn(@Request() req): Promise<SuccessApiResponse> {
    const tokens: Tokens = await this.authService.login(req.user);
    const apiResponse: SuccessApiResponse = {
      message: 'User logged in successfully!',
      statusCode: HttpStatus.OK,
      data: {
        entity: {
          user: req.user,
          access_token: tokens.access_token,
        },
      },
    };
    return apiResponse;
  }

  @AllowAnonymous()
  @UseGuards(OTPAuthGuard)
  @HttpCode(HttpStatus.OK)
  @Post('/login-otp')
  async loginOtp(@Request() req): Promise<SuccessApiResponse> {
    const tokens: Tokens = await this.authService.login(req.user);
    const apiResponse: SuccessApiResponse = {
      message: 'User logged in successfully!',
      statusCode: HttpStatus.OK,
      data: {
        entity: {
          user: req.user,
          access_token: tokens.access_token,
        },
      },
    };
    return apiResponse;
  }

  @AllowAnonymous()
  @HttpCode(HttpStatus.OK)
  @Post('/generate-otp')
  async generateOtp(@Body() user: GenerateOtpDto): Promise<SuccessApiResponse> {
    const generateOtpResponseDto = await this.authService.generateOtp(user);
    const apiResponse: SuccessApiResponse = {
      message: 'OTP has been sent!',
      statusCode: HttpStatus.OK,
      data: generateOtpResponseDto,
    };
    return apiResponse;
  }

  @HttpCode(HttpStatus.OK)
  @Post('/change-password/:id')
  async changePassword(
    @Param('id', new ParseUUIDPipe()) userId: string,
    @Body() changePasswordDto: ChangePasswordDto,
  ): Promise<SuccessApiResponse> {
    const dto: ResetPassTokenDto = {
      newPassword: changePasswordDto.newPassword,
      userId: userId,
    };

    const resetPasswordDto: ResetPassTokenDto = new ResetPassTokenDto(dto);
    const status: boolean = await this.authService.resetPassword(
      resetPasswordDto,
    );

    const apiResponse: SuccessApiResponse = {
      message: 'Password changed successfully!',
      statusCode: HttpStatus.OK,
      data: status,
    };

    return apiResponse;
  }

  @AllowAnonymous()
  @HttpCode(HttpStatus.OK)
  @Post('/forget-password')
  async forgetPassword(
    @Body() forgetPasswordDto: ForgetPasswordDto,
  ): Promise<SuccessApiResponse> {
    const status: boolean = await this.authService.emailResetPasswordLink(
      forgetPasswordDto,
    );
    const apiResponse: SuccessApiResponse = {
      message: 'Reset link mail sent!',
      statusCode: HttpStatus.OK,
      data: status,
    };
    return apiResponse;
  }

  @AllowAnonymous()
  @UseGuards(JwtQueryParamGuard) // but authorize with token from query param
  @HttpCode(HttpStatus.OK)
  @Post('/reset/:id')
  async resetPassToken(
    @Param('id', new ParseUUIDPipe()) userId: string,
    @Query('token') token: string,
    @Body() resetPasswordDto: ResetPassTokenDto,
  ): Promise<SuccessApiResponse> {
    // use this url http://localhost:7575/api/v1/user/reset/{{nestjs_userid}}?token={{nestjs_token}}

    resetPasswordDto.userId = userId;
    const status: boolean = await this.authService.resetPassword(
      resetPasswordDto,
    );
    const apiResponse: SuccessApiResponse = {
      message: 'Password updated successfully!',
      statusCode: HttpStatus.OK,
      data: status,
    };
    return apiResponse;
  }

  // @HttpCode(HttpStatus.OK)
  // @Post('/logout')
  // logout(@Req() req: Request) {
  //   const user = req.user;
  //   // eslint-disable-next-line @typescript-eslint/no-unused-vars
  //   const userId = user['sub'];
  //   this.authService.logout();
  // }

  // @Public()
  // @UseGuards(RtGuard)
  // @HttpCode(HttpStatus.OK)
  // @Post('/refresh')
  // refreshTokens(@Req() req: Request) {
  //   const user = req.user;

  //   this.authService.refreshTokens(user['sub'], user['email']);
  // }
}
