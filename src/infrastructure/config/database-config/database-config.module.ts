import { Module } from '@nestjs/common';
import { DatabaseConfigService } from './database-config.service';
import { ConfigService, ConfigModule } from '@nestjs/config';
import dbConfig from './mongo.config';
import rootOptions, { RootConfigOptions } from '../root-config-options';
import Joi = require('@hapi/joi');

const configOptions: RootConfigOptions = {
  load: [dbConfig],
  validationSchema: Joi.object({
    mongoServer: Joi.string().required(),
    mongoDb: Joi.string().required(),
    mongoUri: Joi.string().required(),
  }),
};

@Module({
  imports: [ConfigModule.forRoot(rootOptions(configOptions))],
  providers: [ConfigService, DatabaseConfigService],
  exports: [DatabaseConfigService],
})
export class DatabaseConfigModule {}
