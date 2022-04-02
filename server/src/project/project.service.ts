import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm/dist';
import { Repository } from 'typeorm';
import { Project } from './project.entity';
import { User } from '../user/user.entity';
import { CreateProjectInput } from './dto/CreateProjectInput.dto';

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(Project)
    private projectRepository: Repository<Project>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  findByUser(userId: string) {
    return this.projectRepository.find({ userId });
  }

  findById(projectId: string) {
    return this.projectRepository.findOne(projectId);
  }

  async addProject(projectData: CreateProjectInput): Promise<Project> {
    const user = await this.userRepository.findOne(projectData.userId);
    const project = this.projectRepository.create({
      title: projectData.title,
      user,
    });
    return this.projectRepository.save(project);
  }

  async changeProjectTitle(projectId: string, title: string): Promise<Project> {
    await this.projectRepository.update(projectId, { title });
    return await this.projectRepository.findOne(projectId);
  }

  async deleteProject(projectId: string): Promise<Project> {
    const project = await this.projectRepository.findOne(projectId);
    return this.projectRepository.remove(project);
  }
}
