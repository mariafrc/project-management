import { IsNotEmpty, IsString } from 'class-validator';

export class ChangeProjectTitleInput {
  @IsString()
  @IsNotEmpty()
  title: string;
}
