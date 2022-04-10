import { Component, OnInit } from '@angular/core';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { SelectItem } from 'primeng/api';

import { TaskService } from 'src/app/akita-store/task/task.service';
import { Task, TaskStatus } from 'src/app/akita-store/task/task.model';

interface TaskForm {
  title: string;
  status?: TaskStatus;
}

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss'],
})
export class TaskFormComponent implements OnInit {
  action: 'add' | 'edit';
  taskForm: TaskForm;
  status: any[];
  projectId: number;
  selectedTask: Task;

  constructor(
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private taskService: TaskService
  ) {
    this.status = [
      { label: 'Waiting', value: 'waiting' },
      { label: 'In progress', value: 'processing' },
      { label: 'Finished', value: 'finished' },
    ];
  }

  ngOnInit(): void {
    this.action = this.config.data.action;

    if (this.action === 'add') {
      this.projectId = this.config.data.projectId;
      this.taskForm = { title: '' };
    } else {
      this.selectedTask = this.config.data.task;
      console.log({ selectedTask: this.selectedTask });
      this.taskForm = {
        title: this.selectedTask.title,
        status: this.selectedTask.status,
      };
    }
  }

  onSubmit() {
    if (this.action === 'add') {
      this.taskService.addTask(this.taskForm.title, this.projectId);
    } else {
      this.taskService.updateTask({
        ...this.selectedTask,
        title: this.taskForm.title,
        status: this.taskForm.status,
      });
    }

    this.ref.close();
  }
}
