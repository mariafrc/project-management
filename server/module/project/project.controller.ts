import { Controller, Body, Post, Patch, Param, ParseIntPipe, Delete, Get, UseInterceptors, ClassSerializerInterceptor, UseGuards } from '@nestjs/common';
import { UpsertProjectDto, ChangeTitleDto } from './project.dto';
import { ProjectService } from './project.service';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '~guard/jwt-auth.guard';

@Controller('api/projects')
@ApiTags('projects')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@UseInterceptors(ClassSerializerInterceptor)
export class ProjectController {
    constructor(private projectService: ProjectService){}

    @Post()
    addProject(@Body() upsertProjectDto: UpsertProjectDto){
        return this.projectService.addProject(upsertProjectDto);
    }

    @Patch(':id/change-title')
    changeTitle(@Param('id', ParseIntPipe) id: number, @Body() changeTitleDto: ChangeTitleDto){
        return this.projectService.changeProjectTitle(id, changeTitleDto.title);
    }
    
    @Delete(':id')
    deleteProject(@Param('id', ParseIntPipe) id: number){
        return this.projectService.deleteProject(id);
    }

    @Get(':id/tasks')
    getTasks(@Param('id', ParseIntPipe) id: number){
        return this.projectService.findTasks(id);
    }

    @Get(':id/tasks/:taskId')
    getOneTask(@Param('id', ParseIntPipe) id: number, @Param('taskId', ParseIntPipe) taskId: number){
        return this.projectService.findOneTask(id, taskId);
    }
}
