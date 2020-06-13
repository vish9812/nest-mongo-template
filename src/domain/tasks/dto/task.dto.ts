import { TaskStatus } from '../enums/task-status.enum';

export class TaskDto {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
}
