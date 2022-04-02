import { IsString, IsNotEmpty } from 'class-validator';

export class ChangeNameInput {
  @IsString()
  @IsNotEmpty()
  username: string;
}
