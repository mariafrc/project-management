import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { UserService } from 'src/user/user.service';

@Injectable()
export class UniqueUserValidationPipe implements PipeTransform {
  constructor(private userService: UserService) {}

  async transform(value: any, metadata: ArgumentMetadata) {
    if (metadata.type === 'body') {
      const user = await this.userService.findByName(value.username);
      if (user) {
        throw new BadRequestException('user-already-exist');
      }
    }

    return value;
  }
}
