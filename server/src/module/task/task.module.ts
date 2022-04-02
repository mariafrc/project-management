import { Module } from '@nestjs/common';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectModule } from '~module/project/project.module';
import { Task } from '~entity/task.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Task]),
    ProjectModule
  ],
  controllers: [TaskController],
  providers: [TaskService]
})
export class TaskModule {}
