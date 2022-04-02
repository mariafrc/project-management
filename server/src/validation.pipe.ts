import { PipeTransform, Injectable, ArgumentMetadata, HttpException, HttpStatus } from '@nestjs/common';
import { validate } from 'class-validator';
import * as transformer from 'class-transformer'
import { plainToClass } from 'class-transformer';

@Injectable()
export class ValidationPipe implements PipeTransform<any> {
  async transform(value: any, { metatype }: ArgumentMetadata) {
    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }
    const object = plainToClass(metatype, value);
    const errors = await validate(object);
    if (errors.length > 0) {
      let output = []
      for(let error of errors){
        output.push({
          property: error.property,
          constraints: error.constraints
        })
      }
      
      throw new HttpException({
        statusCode: HttpStatus.BAD_REQUEST,
        errors: output,
        type: 'bad schema',
        message: 'Bad request',
      }, 400);
    }
    return value;
  }

  private toValidate(metatype: Function): boolean {
    const types: Function[] = [String, Boolean, Number, Array, Object];
    return !types.includes(metatype);
  }
}