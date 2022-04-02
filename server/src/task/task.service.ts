import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Project } from '../project/project.entity';
import { Task } from './task.entity';
import { Repository } from 'typeorm';
import { AddTaskInput } from './dto/AddTaskInput.dto';
import { UpdateTaskInput } from './dto/UpdateTaskInput.dto';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Project)
    private projectRepository: Repository<Project>,
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
  ) {}

  findByProject(projectId: string) {
    return this.taskRepository.find({ projectId });
  }

  findById(taskId: string) {
    return this.taskRepository.findOne(taskId);
  }

  async addTask(taskData: AddTaskInput): Promise<Task> {
    const project = await this.projectRepository.findOne(taskData.projectId);
    const task = this.taskRepository.create({
      ...taskData,
      status: 'waiting',
      project,
    });
    return await this.taskRepository.save(task);
  }

  async updateTask(taskId: string, taskData: UpdateTaskInput): Promise<Task> {
    await this.taskRepository.update(taskId, taskData);
    return await this.taskRepository.findOne(taskId);
  }

  async deleteTask(taskId: string): Promise<Task> {
    const task = await this.taskRepository.findOne(taskId);
    return await this.taskRepository.remove(task);
  }
}
