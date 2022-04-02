import {
  Controller,
  Body,
  Post,
  Patch,
  Param,
  ParseIntPipe,
  Delete,
  Get,
  UseInterceptors,
  ClassSerializerInterceptor,
  UseGuards,
  Query,
} from '@nestjs/common';
import { ProjectService } from './project.service';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt/jwt-auth.guard';
import { Project } from './project.entity';
import { CreateProjectInput } from './dto/CreateProjectInput.dto';
import { ChangeProjectTitleInput } from './dto/ChangeProjectTitleInput.dto';

@Controller('api/projects')
@ApiTags('projects')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@UseInterceptors(ClassSerializerInterceptor)
export class ProjectController {
  constructor(private projectService: ProjectService) {}

  @Get()
  getAll(@Query('userId') userId: string): Promise<Project[]> {
    if (!userId) {
      return Promise.resolve([]);
    }

    return this.projectService.findByUser(userId);
  }

  @Get(':id')
  getOne(@Param('id') id: string) {
    return this.projectService.findById(id);
  }

  @Post()
  addProject(@Body() createProjectInput: CreateProjectInput) {
    return this.projectService.addProject(createProjectInput);
  }

  @Patch(':id/change-title')
  changeTitle(
    @Param('id') id: string,
    @Body() changeTitleInput: ChangeProjectTitleInput,
  ) {
    return this.projectService.changeProjectTitle(id, changeTitleInput.title);
  }

  @Delete(':id')
  deleteProject(@Param('id') id: string) {
    return this.projectService.deleteProject(id);
  }
}
