import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Project } from '~entity/project.entity';
import { Task } from '~entity/task.entity';
import { Repository } from 'typeorm';
import { AddTaskDto, UpdateTaskDto } from './task.dto';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Project)
    private projectRepository: Repository<Project>,
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
  ) {}

  async addTask(taskData: AddTaskDto): Promise<Task> {
    const project = await this.projectRepository.findOne(taskData.project);
    const task = this.taskRepository.create({
      ...taskData,
      id: null,
      status: 'waiting',
      project,
    });
    return await this.taskRepository.save(task);
  }

  async updateTask(taskId: number, taskData: UpdateTaskDto): Promise<Task> {
    await this.taskRepository.update(taskId, taskData);
    return await this.taskRepository.findOne(taskId);
  }

  async deleteTask(taskId: number): Promise<Task> {
    const task = await this.taskRepository.findOne(taskId);
    return await this.taskRepository.remove(task);
  }
}
