import { Injectable } from '@angular/core';
import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { Task } from './task.model';

export interface TasksState extends EntityState<Task, number> {
  selected: Task | null;
}

@Injectable({
  providedIn: 'root',
})
@StoreConfig({ name: 'tasks' })
export class TasksStore extends EntityStore<TasksState> {
  constructor() {
    super({ selected: null });
  }

  setSelected(task: Task) {
    this.set({ selected: task });
  }
}
