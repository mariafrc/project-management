import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TasksStore } from './task.store';
import { Task } from './task.model';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  constructor(private tasksStore: TasksStore, private http: HttpClient) {}

  loadTasks(projectId: number) {
    this.http
      .get<Task[]>(`/tasks?projectId=${projectId}`)
      .subscribe((tasks) => {
        this.tasksStore.set(tasks);
      });
  }

  addTask(title: string, projectId: number) {
    this.http.post<Task>(`/tasks`, { title, projectId }).subscribe((task) => {
      this.tasksStore.add(task);
    });
  }

  updateTask(task: Task) {
    const { id: taskId, ...taskData } = task;
    this.http
      .put<Task>(`/tasks/${taskId}`, taskData)
      .subscribe((updatedTask) => {
        this.tasksStore.update(taskId, updatedTask);
      });
  }

  removeTask(taskId: number) {
    this.http.delete(`/tasks/${taskId}`).subscribe(() => {
      this.tasksStore.remove(taskId);
    });
  }
}
