import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ApiConfigService } from './infrastructure/config/api-config/api-config.service';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);

  const apiConfigService = app.get(ApiConfigService);

  app.useGlobalPipes(new ValidationPipe());

  await app.listen(apiConfigService.port);
}
bootstrap();
