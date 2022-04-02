import { IsNotEmpty, IsString } from 'class-validator';

export class RegisterInput {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
