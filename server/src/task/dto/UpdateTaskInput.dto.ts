import { IsString, IsNotEmpty, IsIn } from 'class-validator';

export class UpdateTaskInput {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  @IsIn(['waiting', 'processing', 'finished'])
  status: string;
}
