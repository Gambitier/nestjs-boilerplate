import { HttpStatus } from '@nestjs/common';

export class BusinessException extends Error {
  constructor(
    public readonly code: HttpStatus,
    public readonly exception: {
      message: string;
      error?: any;
    },
  ) {
    super(exception.message);
  }
}
