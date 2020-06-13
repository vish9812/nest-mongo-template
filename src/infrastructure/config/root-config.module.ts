import { Module } from '@nestjs/common';
import { DatabaseConfigModule } from './database-config/database-config.module';
import { ApiConfigModule } from './api-config/api-config.module';

@Module({
  imports: [ApiConfigModule, DatabaseConfigModule],
})
export class RootConfigModule {}
