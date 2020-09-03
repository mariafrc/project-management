import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { UserService } from '~services/user/user.service';
import {Project} from './project.model';

import * as ProjectActions from './project.actions';

@Injectable()
export class ProjectEffects {

  loadProjects$ = createEffect(() => {
    return this.actions$.pipe( 

      ofType(ProjectActions.PROJECT_PAGE_LOAD_PROJECTS),
      concatMap(() => {
        const { id } = this.userService.getUserdata();
        return this.http.get<Project[]>(`/projects?userId=${id}`)
          .pipe(
            map(projects => ProjectActions.LOAD_PROJECT_SUCCESS({ projects })),
            catchError(error => of(ProjectActions.ACTION_FAIL({error})))
          )
      })
    );
  });

  addProject$ = createEffect(() => {
    return this.actions$.pipe( 

      ofType(ProjectActions.PROJECT_MODAL_ADD_PROJECT),
      concatMap(({title}) => {
        const { id } = this.userService.getUserdata();
        return this.http.post<Project>('/projects', {title, userId: id})
          .pipe(
            map(project => ProjectActions.ADD_PROJECT_SUCCESS({ project })),
            catchError(error => of(ProjectActions.ACTION_FAIL({error})))
          )
      })
    );
  });

  updateProject$ = createEffect(() => {
    return this.actions$.pipe( 

      ofType(ProjectActions.PROJECT_MODAL_UPDATE_PROJECT),
      concatMap(({id, title}) => {
        return this.http.patch<Project>(`/projects/${id}/change-title`, {title})
          .pipe(
            map(project => ProjectActions.PROJECT_PAGE_LOAD_PROJECTS()),
            catchError(error => of(ProjectActions.ACTION_FAIL({error})))
          )
      })
    );
  });

  deleteProject$ = createEffect(() => {
    return this.actions$.pipe( 

      ofType(ProjectActions.PROJECT_PAGE_DELETE_PROJECT),
      concatMap(({id}) => {
        return this.http.delete<Project>(`/projects/${id}`)
          .pipe(
            map(project => ProjectActions.DELETE_PROJECT_SUCCESS({ id })),
            catchError(error => of(ProjectActions.ACTION_FAIL({error})))
          )
      })
    );
  });

  // actionFail$ = createEffect(() => {
  //   return this.actions$.pipe( 
  //     ofType(ProjectActions.ACTION_FAIL)
  //   )
  // });

  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private userService: UserService
   ) {}

}
