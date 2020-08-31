import { Controller, Post, Body, Put, Param, ParseIntPipe, Delete, UseInterceptors, ClassSerializerInterceptor } from '@nestjs/common';
import { TaskService } from './task.service';
import { AddTaskDto, UpdateTaskDto } from './task.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('api/tasks')
@ApiTags('tasks')
@UseInterceptors(ClassSerializerInterceptor)
export class TaskController {
    constructor(private taskService: TaskService){}

    @Post()
    addTask(@Body() addTaskDto: AddTaskDto){
        return this.taskService.addTask(addTaskDto);
    }

    @Put(':id')
    updateTask(@Param('id', ParseIntPipe) id: number, @Body() updateTaskDto: UpdateTaskDto) {
        return this.taskService.updateTask(id, updateTaskDto);
    }

    @Delete(':id')
    deleteTask(@Param('id', ParseIntPipe) id: number){
        return this.taskService.deleteTask(id);
    }
}
