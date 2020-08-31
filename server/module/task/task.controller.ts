import { 
    Controller, 
    Post, 
    Body, 
    Put, 
    Param, 
    ParseIntPipe, 
    Delete, 
    UseInterceptors, 
    ClassSerializerInterceptor, 
    UseGuards 
} from '@nestjs/common';
import { TaskService } from './task.service';
import { AddTaskDto, UpdateTaskDto } from './task.dto';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '~guard/jwt-auth.guard';

@Controller('api/tasks')
@ApiTags('tasks')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
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
