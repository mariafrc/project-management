import { ApiProperty } from '@nestjs/swagger';

export class RegisterOutput {
  @ApiProperty()
  id: string;

  @ApiProperty()
  username: string;

  @ApiProperty()
  access_token: string;
}
