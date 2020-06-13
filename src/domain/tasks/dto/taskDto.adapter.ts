import { TaskDto } from './task.dto';
import { Task } from '../models/task';

export class TaskDtoAdapter {
  static toDto(task: Task): TaskDto {
    const dto = { ...task };
    return dto;
  }

  static fromDto(dto: TaskDto): Task {
    const model = { ...dto };
    return model;
  }

  static toDtos(tasks: Task[]): TaskDto[] {
    const dto = [...tasks];
    return dto;
  }
}
