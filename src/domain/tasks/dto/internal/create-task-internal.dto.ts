import { TaskStatus } from '../../enums/task-status.enum';

export class CreateTaskInternalDto {
  title: string;
  description: string;
  status: TaskStatus;
}
