import { Module, Global } from '@nestjs/common';
import { ApiConfigService } from './api-config.service';
import { ConfigService, ConfigModule } from '@nestjs/config';
import apiConfig from './api.config';
import configInit, { RootConfigOptions } from '../root-config-options';
import Joi = require('@hapi/joi');
import { ApiEnvOptions } from './api-config.enum';

const configOptions: RootConfigOptions = {
  load: [apiConfig],
  validationSchema: Joi.object({
    apiEnv: Joi.string()
      .valid(ApiEnvOptions.local, ApiEnvOptions.test)
      .default(ApiEnvOptions.local),
    port: Joi.number().default(3000),
  }),
};

@Global()
@Module({
  imports: [ConfigModule.forRoot(configInit(configOptions))],
  providers: [ConfigService, ApiConfigService],
  exports: [ApiConfigService],
})
export class ApiConfigModule {}
