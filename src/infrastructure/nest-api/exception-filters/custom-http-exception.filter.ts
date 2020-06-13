import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { Request, Response } from 'express';
import { CustomHttpException } from './custom-http-exception';
import { CustomErrorResponse } from './custom-error-response';

@Catch(CustomHttpException)
export class CustomHttpExceptionFilter
  implements ExceptionFilter<CustomHttpException> {
  catch(exception: CustomHttpException, host: ArgumentsHost): any {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const customResponse = exception.getResponse() as CustomErrorResponse;

    console.log('Logging Custom Error>>>', {
      ...customResponse,
      isoTimestamp: new Date().toISOString(),
      path: request.url,
      stack: exception.stack,
    });

    response.status(customResponse.httpStatusCode).json(customResponse);
  }
}
