import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {config} from 'dotenv';
import { UserModule } from './module/user/user.module';
import { AuthModule } from './module/auth/auth.module';
config()

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    UserModule
    AuthModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
