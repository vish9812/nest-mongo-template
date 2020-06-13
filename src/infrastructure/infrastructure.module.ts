import { Module } from '@nestjs/common';
import { RootConfigModule } from './config/root-config.module';
import { DatabaseModule } from './database/database.module';
import { NestApiModule } from './nest-api/nest-api.module';

@Module({
  imports: [RootConfigModule, DatabaseModule, NestApiModule],
})
export class InfrastructureModule {}
