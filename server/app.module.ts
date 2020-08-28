import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {config} from 'dotenv';
import { UserModule } from './module/user/user.module';
config()

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    UserModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
