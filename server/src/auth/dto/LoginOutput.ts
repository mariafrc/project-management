import { ApiProperty } from '@nestjs/swagger';

export class LoginOutput {
  @ApiProperty()
  id: string;

  @ApiProperty()
  username: string;

  @ApiProperty()
  access_token: string;
}
