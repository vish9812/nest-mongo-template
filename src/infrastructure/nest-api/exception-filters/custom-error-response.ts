import { HttpStatus } from '@nestjs/common';
import { CustomErrorCode } from './custom-error-code.enum';

export interface CustomErrorResponse {
  httpStatusCode: HttpStatus;
  customCode?: CustomErrorCode;
  params?: any[];
  message?: string;
  stackTrace?: string;
  innerException?: CustomErrorResponse;
}
