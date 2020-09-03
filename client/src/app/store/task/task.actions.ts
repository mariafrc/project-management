import { createAction, props } from '@ngrx/store';
import {Task} from './task.model';

export const TASK_PAGE_LOAD_TASK = createAction(
  '[Task Page] Load Tasks',
  props<{projectId: number}>()
);

export const LOAD_TASK_SUCCESS = createAction(
  '[Task API] Load Tasks Success',
  props<{ tasks: Task[] }>()
);

export const ACTION_FAIL = createAction(
  '[Task API] Action Fail',
  props<{error: any}>()
);

export const TASK_MODAL_ADD_TASK = createAction(
  '[Task Modal] Add Task',
  props<{title: string, projectId: number}>()
);

export const ADD_TASK_SUCCESS = createAction(
  '[Task API] Add Task Success',
  props<{task: Task}>()
);

export const TASK_MODAL_UPDATE_TASK = createAction(
  '[Task Modal] Update Task',
  props<{task: Task}>()
);

export const TASK_EFFECT_LOAD_TASK = createAction(
  '[Task Effect] Load Task',
  props<{projectId: number}>()
);

export const TASK_PAGE_DELETE_TASK = createAction(
  '[Task Page] Delete Task',
  props<{id: number}>()
);

export const DELETE_TASK_SUCCESS = createAction(
  '[Task API] Delete Task Success',
  props<{id: number}>()
);