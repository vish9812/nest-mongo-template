import { Injectable, HttpStatus } from '@nestjs/common';
import { TasksRepository } from './tasks.repository';
import { Task } from './models';
import {
  CreateTaskDto,
  CreateTaskInternalDto,
  FilterTaskDto,
  UpdateTaskDto,
} from './dto';
import { TaskStatus } from './enums';
import { CustomHttpException } from 'src/infrastructure/nest-api/exception-filters/custom-http-exception';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  constructor(private readonly tasksRepository: TasksRepository) {}

  async create(createTaskDto: CreateTaskDto): Promise<Task> {
    const createTaskInternalDto: CreateTaskInternalDto = {
      ...createTaskDto,
      status: TaskStatus.Open,
    };

    const newTask = await this.tasksRepository.create(createTaskInternalDto);

    return newTask;
  }

  async getFilteredTasks(filterTaskDto: FilterTaskDto): Promise<Task[]> {
    const tasks = await this.tasksRepository.getTasks(filterTaskDto);

    return tasks;
  }

  getById(id: string): Task {
    const task = this.tasks.find(t => t.id === id);

    if (!task) {
      throw new CustomHttpException({
        httpStatusCode: HttpStatus.NOT_FOUND,
        message: 'My Inner Exception',
        params: [id],
      });
    }

    return task;
  }

  remove(id: string): void {
    this.getById(id);

    const updatedTasks = this.tasks.filter(t => t.id !== id);
    this.tasks = updatedTasks;
  }

  update(id: string, updateDto: UpdateTaskDto): Task {
    const task = this.getById(id);
    task.status = updateDto.status;

    return task;
  }
}
