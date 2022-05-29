import { HttpStatus } from '@nestjs/common';

export type SuccessApiResponse = {
  message: string;
  statusCode: HttpStatus;
  data: any;
};
