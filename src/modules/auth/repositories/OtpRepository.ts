import { Injectable } from '@nestjs/common';
import { Otp, Prisma } from '@prisma/client';
import * as _ from 'lodash';
import { UserDto } from 'src/modules/user/dto';
import { PrismaService } from 'src/prisma.service';
import { OtpResponseDto } from '../dto';
import { IOtpRepository } from './interfaces/IOtpRepository';

@Injectable()
export class OtpRepository implements IOtpRepository {
  private otpDelegate: Prisma.OtpDelegate<
    Prisma.RejectOnNotFound | Prisma.RejectPerOperation
  >;

  constructor(private prisma: PrismaService) {
    this.otpDelegate = prisma.otp;
  }

  async setOtpAsValidated(otpDto: OtpResponseDto): Promise<boolean> {
    await this.otpDelegate.update({
      where: {
        id: otpDto.id,
      },
      data: {
        isValidated: true,
      },
    });

    return true;
  }

  //-------------------------------------------------------------------------//
  async getMostRecentOtp(phoneWork: string): Promise<OtpResponseDto> {
    const dbRecord = await this.otpDelegate.findFirst({
      where: { phoneWork: phoneWork, isValidated: false },
      orderBy: { validTo: 'desc' },
    });

    if (_.isEmpty(dbRecord)) {
      return null;
    }

    const dto: OtpResponseDto = {
      id: dbRecord.id,
      userName: dbRecord.userName,
      mobileNumber: dbRecord.phoneWork,
      validFrom: dbRecord.validFrom,
      validTo: dbRecord.validTo,
      otp: dbRecord.OTP,
    };

    return new OtpResponseDto(dto);
  }

  async createOtp(userDto: UserDto): Promise<OtpResponseDto> {
    const otp = (Math.floor(Math.random() * 900000) + 100000).toString();
    const validFrom = new Date();
    const validTo = new Date(validFrom.getTime() + 1000 * 180);

    const otpData: Prisma.OtpCreateInput = {
      OTP: otp,
      userId: userDto.id,
      userName: userDto.userName,
      phoneWork: userDto.mobileNumber,
      validFrom: validFrom,
      validTo: validTo,
      isValidated: false,
    };

    // before creating new OTP, expire previous ones
    await this.otpDelegate.updateMany({
      where: {
        userId: userDto.id,
      },
      data: {
        validTo: new Date(),
      },
    });

    const dbRecord: Otp = await this.otpDelegate.create({
      data: { ...otpData, createdAt: new Date() },
    });

    if (_.isEmpty(dbRecord)) {
      return null;
    }

    const dto: OtpResponseDto = {
      id: dbRecord.id,
      userName: dbRecord.userName,
      mobileNumber: dbRecord.phoneWork,
      validFrom: dbRecord.validFrom,
      validTo: dbRecord.validTo,
      otp: dbRecord.OTP,
    };

    return new OtpResponseDto(dto);
  }
}
