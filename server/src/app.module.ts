import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

import { UserModule } from './user/user.module';
import { ProjectModule } from './project/project.module';
import { TaskModule } from './task/task.module';
import { AuthModule } from './auth/auth.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
@Module({
  imports: [
    TypeOrmModule.forRoot(),
    ConfigModule.forRoot(),
    UserModule,
    ProjectModule,
    TaskModule,
    AuthModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../../client/dist/app'),
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
