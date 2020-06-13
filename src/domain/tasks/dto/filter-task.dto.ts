import { TaskStatus, TaskStatuses } from '../enums/task-status.enum';
import { IsOptional, IsIn, IsNotEmpty } from 'class-validator';

export class FilterTaskDto {
  @IsOptional()
  @IsIn(TaskStatuses)
  status?: TaskStatus;

  @IsOptional()
  @IsNotEmpty()
  search?: string;
}
