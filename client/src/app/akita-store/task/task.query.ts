import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { Observable } from 'rxjs';
import { TasksState, TasksStore } from './task.store';

@Injectable({
  providedIn: 'root',
})
export class TasksQuery extends QueryEntity<TasksState> {
  constructor(protected store: TasksStore) {
    super(store);
  }

  active$ = this.select((state) => state.selected);
  activeId$: Observable<number | null> = this.select(
    (state) => state.selected?.id || null
  );
  tasks$ = this.selectAll();
}
