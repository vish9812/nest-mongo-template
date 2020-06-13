import { Injectable, Inject } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import databaseConfig from './mongo.config';
import { ConnectionOptions } from 'mongoose';
import { join } from 'path';
import { readFileSync } from 'fs';
import { ApiConfigService } from '../api-config/api-config.service';
import { ApiEnvOptions } from '../api-config/api-config.enum';

@Injectable()
export class DatabaseConfigService {
  constructor(
    private apiConfigService: ApiConfigService,
    @Inject(databaseConfig.KEY)
    private dbConfig: ConfigType<typeof databaseConfig>,
  ) {}

  get uri(): string {
    return this.dbConfig.uri as string;
  }

  get options(): ConnectionOptions {
    if (this.apiConfigService.env === ApiEnvOptions.local) {
      return {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      };
    }

    const root = process.cwd();
    const filePath = join(root, 'mongodb.pem');
    const ca = [readFileSync(filePath)];
    const cert = readFileSync(filePath);

    return {
      connectTimeoutMS: 0,
      socketTimeoutMS: 0,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      ssl: true,
      sslCA: ca,
      sslCert: cert,
      sslKey: cert,
      sslValidate: false,
    };
  }
}
