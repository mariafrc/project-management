import { IsNotEmpty, IsString } from 'class-validator';

export class CreateProjectInput {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  userId: string;
}
