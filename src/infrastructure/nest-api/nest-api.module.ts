import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { CustomHttpExceptionFilter } from './exception-filters/custom-http-exception.filter';

@Module({
  providers: [
    {
      provide: APP_FILTER,
      useClass: CustomHttpExceptionFilter,
    },
  ],
})
export class NestApiModule {}
