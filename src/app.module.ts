import { Module } from '@nestjs/common';
import { InfrastructureModule } from './infrastructure/infrastructure.module';
import { DomainModule } from './domain/domain.module';

@Module({
  imports: [DomainModule, InfrastructureModule],
})
export class AppModule {}
