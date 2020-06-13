import { Injectable, Inject } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import apiConfig from './api.config';

@Injectable()
export class ApiConfigService {
  constructor(
    @Inject(apiConfig.KEY)
    private config: ConfigType<typeof apiConfig>,
  ) {}

  get env(): string {
    return this.config.env as string;
  }

  get port(): number {
    return Number(this.config.port);
  }
}
