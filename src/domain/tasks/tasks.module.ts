import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { TasksRepository } from './tasks.repository';
import taskDbModel from './task.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: taskDbModel.modelName, schema: taskDbModel.schema },
    ]),
  ],
  controllers: [TasksController],
  providers: [TasksService, TasksRepository],
})
export class TasksModule {}
