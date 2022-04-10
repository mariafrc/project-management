import { Component, OnInit, OnDestroy } from '@angular/core';
import { DialogService } from 'primeng/dynamicdialog';
import { ActivatedRoute } from '@angular/router';
import { SelectItem } from 'primeng/api';

import { TaskFormComponent } from '../task-form/task-form.component';

import { ProjectsQuery } from 'src/app/akita-store/project/project.query';
import { TasksQuery } from 'src/app/akita-store/task/task.query';
import { TaskService } from 'src/app/akita-store/task/task.service';
import { SubSink } from 'subsink';
import { Project } from 'src/app/akita-store/project/project.model';
import { Task } from 'src/app/akita-store/task/task.model';

const statusOptions: SelectItem[] = [
  { label: '----------', value: null },
  { label: 'Waiting', value: 'waiting' },
  { label: 'In progress', value: 'processing' },
  { label: 'Finished', value: 'finished' },
];

@Component({
  selector: 'app-task-preview',
  templateUrl: './task-preview.component.html',
  styleUrls: ['./task-preview.component.scss'],
  providers: [DialogService],
})
export class TaskPreviewComponent implements OnInit, OnDestroy {
  filter = { title: '', status: '' };
  projectId: number;
  project: Project;
  _tasks: Task[];
  status = statusOptions;
  subSink = new SubSink();

  constructor(
    public dialogService: DialogService,
    private route: ActivatedRoute,
    private projectQuery: ProjectsQuery,
    private taskQuery: TasksQuery,
    private taskService: TaskService
  ) {}

  ngOnInit(): void {
    this.projectId = this.route.snapshot.params['id'];

    this.subSink.add(
      this.projectQuery.projects$.subscribe((projects) => {
        this.project = projects.find((p) => p.id === this.projectId);
      }),
      this.taskQuery.tasks$.subscribe((tasks) => {
        this._tasks = tasks;
      })
    );

    this.taskService.loadTasks(this.projectId);
  }

  get tasks(): Task[] {
    let tasks = this._tasks;
    if (this.filter.title) {
      tasks = tasks.filter((t) => t.title.includes(this.filter.title));
    }

    if (this.filter.status) {
      tasks = tasks.filter((t) => t.status === this.filter.status);
    }
    return tasks;
  }

  onResetFilter() {
    this.filter = { title: '', status: '' };
  }

  onAdd(): void {
    this.dialogService.open(TaskFormComponent, {
      header: 'New task',
      width: '500px',
      data: {
        action: 'add',
        projectId: this.projectId,
      },
    });
  }

  onEdit(task: Task): void {
    this.dialogService.open(TaskFormComponent, {
      header: 'Update task',
      width: '500px',
      data: {
        action: 'edit',
        task,
      },
    });
  }

  onDelete(id: number) {
    this.taskService.removeTask(id);
  }

  ngOnDestroy(): void {
    this.subSink.unsubscribe();
  }
}
