import { IsString, IsNotEmpty } from 'class-validator';

export class AddTaskInput {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  projectId: string;
}
