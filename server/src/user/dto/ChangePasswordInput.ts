import { IsString, IsNotEmpty } from 'class-validator';

export class ChangePasswordInput {
  @IsString()
  @IsNotEmpty()
  lastPassword: string;

  @IsString()
  @IsNotEmpty()
  newPassword: string;
}
