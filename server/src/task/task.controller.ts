import {
  Controller,
  Post,
  Body,
  Put,
  Param,
  Delete,
  UseInterceptors,
  ClassSerializerInterceptor,
  UseGuards,
  Get,
  Query,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt/jwt-auth.guard';
import { Task } from './task.entity';
import { AddTaskInput } from './dto/AddTaskInput.dto';
import { UpdateTaskInput } from './dto/UpdateTaskInput.dto';

@Controller('api/tasks')
@ApiTags('tasks')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@UseInterceptors(ClassSerializerInterceptor)
export class TaskController {
  constructor(private taskService: TaskService) {}

  @Get()
  getAll(@Query('projectId') projectId: string): Promise<Task[]> {
    if (!projectId) {
      return Promise.resolve([]);
    }

    return this.taskService.findByProject(projectId);
  }

  @Get(':id')
  getOne(@Param('id') id: string) {
    return this.taskService.findById(id);
  }

  @Post()
  addTask(@Body() addTaskInput: AddTaskInput) {
    return this.taskService.addTask(addTaskInput);
  }

  @Put(':id')
  updateTask(
    @Param('id') id: string,
    @Body() updateTaskInput: UpdateTaskInput,
  ) {
    return this.taskService.updateTask(id, updateTaskInput);
  }

  @Delete(':id')
  deleteTask(@Param('id') id: string) {
    return this.taskService.deleteTask(id);
  }
}
