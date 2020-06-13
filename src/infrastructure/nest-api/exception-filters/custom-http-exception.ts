import { HttpException } from '@nestjs/common';
import { CustomErrorResponse } from './custom-error-response';

export class CustomHttpException extends HttpException {
  constructor(apiErrorResponse: CustomErrorResponse) {
    super(apiErrorResponse, apiErrorResponse.httpStatusCode);
  }
}
