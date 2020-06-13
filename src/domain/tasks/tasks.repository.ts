import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { DatabaseService } from 'src/infrastructure/database/database.service';
import { CreateTaskInternalDto, FilterTaskDto } from './dto';
import { Task } from './models';
import { DbRequest } from 'src/infrastructure/database/models/db-request';

@Injectable()
export class TasksRepository {
  constructor(
    @InjectModel('Task') private readonly model: Model<any>,
    private readonly dbService: DatabaseService,
  ) {}

  async create(createTaskInternalDto: CreateTaskInternalDto): Promise<Task> {
    const newTask = await this.dbService.Post<Task, CreateTaskInternalDto>(
      this.model,
      createTaskInternalDto,
    );

    return newTask;
  }

  async getTasks(filterTaskDto: FilterTaskDto): Promise<Task[]> {
    const dbReq: DbRequest = filterTaskDto
      ? { match: { status: filterTaskDto.status } }
      : { match: {} };

    return this.dbService.Get(this.model, dbReq);
  }
}
