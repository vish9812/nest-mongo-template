import {
  Controller,
  Post,
  Body,
  Get,
  Query,
  Param,
  Delete,
  Patch,
  HttpStatus,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import {
  CreateTaskDto,
  TaskDto,
  TaskDtoAdapter,
  FilterTaskDto,
  UpdateTaskDto,
} from './dto';
import { CustomHttpException } from 'src/infrastructure/nest-api/exception-filters/custom-http-exception';
import { CustomErrorCode } from 'src/infrastructure/nest-api/exception-filters/custom-error-code.enum';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Post()
  async create(@Body() createTaskDto: CreateTaskDto): Promise<TaskDto> {
    const newTask = await this.tasksService.create(createTaskDto);
    const dto = TaskDtoAdapter.toDto(newTask);

    return dto;
  }

  @Get()
  async getTasks(@Query() filterTaskDto: FilterTaskDto): Promise<TaskDto[]> {
    const tasks = await this.tasksService.getFilteredTasks(filterTaskDto);
    const dtos = TaskDtoAdapter.toDtos(tasks);

    return dtos;
  }

  @Get(':id')
  getById(@Param('id') id: string): TaskDto {
    try {
      const task = this.tasksService.getById(id);
      const dto = TaskDtoAdapter.toDto(task);

      return dto;
    } catch (error) {
      throw new CustomHttpException({
        httpStatusCode: error.status,
        message: 'My Outer Exception Message',
        customCode: 303,
        params: [id],
        innerException: error.response,
      });
    }
  }

  @Delete(':id')
  remove(@Param('id') id: string): void {
    this.tasksService.remove(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTaskDto: UpdateTaskDto,
  ): TaskDto {
    throw new CustomHttpException({
      httpStatusCode: HttpStatus.BAD_REQUEST,
      customCode: CustomErrorCode.myCode1,
      params: [id, updateTaskDto],
    });

    const updatedTask = this.tasksService.update(id, updateTaskDto);
    const dto = TaskDtoAdapter.toDto(updatedTask);

    return dto;
  }
}
