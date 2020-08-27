import { ArgumentMetadata, Injectable, PipeTransform, HttpException, HttpStatus } from '@nestjs/common';
import {UserService} from '../../user/user.service'

@Injectable()
export class RegisterValidationPipe implements PipeTransform {
  constructor(private readonly userService: UserService){}

  async transform(value: any, metadata: ArgumentMetadata) {
    const user = await this.userService.findOne(value.username)
    if(user)
    	throw new HttpException({
        statusCode: HttpStatus.BAD_REQUEST,
        type: 'user exist',
        message: 'User already exist',
      }, 400);
    
    return value;
  }
}
