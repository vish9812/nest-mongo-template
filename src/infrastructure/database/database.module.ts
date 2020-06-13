import { Module, Global } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DatabaseService } from './database.service';
import { DatabaseConfigService } from '../config/database-config/database-config.service';
import { DatabaseConfigModule } from '../config/database-config/database-config.module';

@Global()
@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [DatabaseConfigModule],
      useFactory: async (configService: DatabaseConfigService) => ({
        uri: configService.uri,
        ...configService.options,
      }),
      inject: [DatabaseConfigService],
    }),
  ],
  providers: [DatabaseService],
  exports: [DatabaseService],
})
export class DatabaseModule {}
