import { BadRequestException, HttpStatus } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import {
  BusinessException,
  BusinessExceptionInfo,
  GenericExceptionInfo,
} from 'src/helper-modules/buisiness-exception';

export const businessExceptionConfigs = {
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: async (cfg: ConfigService) => ({
    responseOnBusinessException: (businessException: BusinessException) => {
      return {
        statusCode: businessException.code,
        message: businessException.message,
        stacktrace: businessException.stack,
      };
    },

    responseOnBadRequestException: (exceptionInfo: BadRequestException) => {
      const errorMsg = exceptionInfo.getResponse() as {
        error: string;
        message: string[];
        statusCode: number;
      };

      return {
        statusCode: HttpStatus.BAD_REQUEST,
        message: exceptionInfo.message,
        error: errorMsg?.message?.join('\n'),
        stacktrace: exceptionInfo.stack,
        errors: exceptionInfo.getResponse(),
      };
    },

    responseOnAnyException: (exceptionInfo: Error) => {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: exceptionInfo.message,
        error: exceptionInfo.message,
        stacktrace: exceptionInfo.stack,
      };
    },

    logOnBusinessException: (exceptionInfo: BusinessExceptionInfo) => {
      console.error(exceptionInfo);
    },

    logOnAnyException: (exceptionInfo: GenericExceptionInfo) => {
      console.error(exceptionInfo);
    },
  }),
};
