import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { Observable } from 'rxjs';
import { ProjectsState, ProjectsStore } from './project.store';

@Injectable({
  providedIn: 'root',
})
export class ProjectsQuery extends QueryEntity<ProjectsState> {
  constructor(protected store: ProjectsStore) {
    super(store);
  }

  active$ = this.select((state) => state.selected);
  activeId$: Observable<number | null> = this.select(
    (state) => state.selected?.id || null
  );
  projects$ = this.selectAll();
}
