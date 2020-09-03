import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap } from 'rxjs/operators';
import { EMPTY, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import * as TaskActions from './task.actions';
import {Task} from './task.model';

@Injectable()
export class TaskEffects {

  loadTasks$ = createEffect(() => {
    return this.actions$.pipe( 

      ofType(
        TaskActions.TASK_PAGE_LOAD_TASK,
        TaskActions.TASK_EFFECT_LOAD_TASK
      ),
      concatMap(({projectId}) => {
        return this.http.get<Task[]>(`/tasks?projectId=${projectId}`)
          .pipe(
            map(tasks => TaskActions.LOAD_TASK_SUCCESS({ tasks })),
            catchError(error => of(TaskActions.ACTION_FAIL({error})))
          )
      })
    );
  });

  addTask$ = createEffect(() => {
    return this.actions$.pipe( 

      ofType(TaskActions.TASK_MODAL_ADD_TASK),
      concatMap(({title, projectId}) => {
        return this.http.post<Task>(`/tasks`, {title, projectId})
          .pipe(
            map(task => TaskActions.ADD_TASK_SUCCESS({ task })),
            catchError(error => of(TaskActions.ACTION_FAIL({error})))
          )
      })
    );
  });

  updateTask$ = createEffect(() => {
    return this.actions$.pipe( 

      ofType(TaskActions.TASK_MODAL_UPDATE_TASK),
      concatMap(({task}) => {
        const {id, ...taskData} = task;
        return this.http.put<Task>(`/tasks/${id}`, taskData)
          .pipe(
            map(task => TaskActions.TASK_EFFECT_LOAD_TASK({ projectId: task.projectId })),
            catchError(error => of(TaskActions.ACTION_FAIL({error})))
          )
      })
    );
  });

  deleteTask$ = createEffect(() => {
    return this.actions$.pipe( 

      ofType(TaskActions.TASK_PAGE_DELETE_TASK),
      concatMap(({id}) => {
        return this.http.delete(`/tasks/${id}`)
          .pipe(
            map(result => TaskActions.DELETE_TASK_SUCCESS({ id })),
            catchError(error => of(TaskActions.ACTION_FAIL({error})))
          )
      })
    );
  });

  constructor(
    private actions$: Actions,
    private http: HttpClient
   ) {}

}
