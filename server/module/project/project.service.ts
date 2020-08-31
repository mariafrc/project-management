import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm/dist';
import { Repository } from 'typeorm';
import { Project } from 'server/entity/project.entity';
import { UpsertProjectDto } from './project.dto';
import { User } from 'server/entity/user.entity';
import { Task } from '~entity/task.entity';

@Injectable()
export class ProjectService {
    constructor(
        @InjectRepository(Project)
        private projectRepository: Repository<Project>,
        @InjectRepository(User)
        private userRepository: Repository<User>
    ){}

    async findTasks(projectId: number): Promise<Task[]>{
        const project = await this.projectRepository.findOne(projectId, {relations: ['tasks']});
        return project.tasks;
    }

    async findOneTask(projectId: number, taskId: number): Promise<Task>{
        const project = await this.projectRepository.findOne(projectId);
        return project.tasks.find(t => t.id === taskId);
    }

    async addProject(projectData: UpsertProjectDto): Promise<Project>{
        const user = await this.userRepository.findOne(projectData.user);
        const project = this.projectRepository.create({
            ...projectData,
            user
        })
        return this.projectRepository.save(project);
    }

    async changeProjectTitle(projectId: number, title: string): Promise<Project>{
        await this.projectRepository.update(projectId, {title});
        return await this.projectRepository.findOne(projectId);
    }

    async deleteProject(projectId: number): Promise<Project>{
        const project = await this.projectRepository.findOne(projectId);
        return this.projectRepository.remove(project);
    }
}
