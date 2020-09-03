import { createAction, props } from '@ngrx/store';
import { Project } from './project.model';

export const PROJECT_PAGE_LOAD_PROJECTS = createAction(
  '[Project Page] Load Projects'
);

export const LOAD_PROJECT_SUCCESS = createAction(
  '[Project API] Load Projects Success',
  props<{ projects: Project[] }>()
);

export const ACTION_FAIL = createAction(
  '[Project API] Action Fail',
  props<{error: any}>()
);

export const PROJECT_MODAL_ADD_PROJECT = createAction(
  '[Project Modal] Add Project',
  props<{title: string}>()
);

export const ADD_PROJECT_SUCCESS = createAction(
  '[Project API] Add Project Success',
  props<{project: Project}>()
);

export const PROJECT_MODAL_UPDATE_PROJECT = createAction(
  '[Project Modal] Update Project',
  props<{id: number, title: string}>()
);

export const UPDATE_PROJECT_SUCCESS = createAction(
  '[Project API] Update Project Success',
  props<{project: Project}>()
);

export const PROJECT_PAGE_DELETE_PROJECT = createAction(
  '[Project Page] Delete Project',
  props<{id: number}>()
);

export const DELETE_PROJECT_SUCCESS = createAction(
  '[Project API] Delete Project Success',
  props<{id: number}>()
);

export const TASK_PAGE_SELECT_PROJECT = createAction(
  '[Task Page] Select Project',
  props<{id: number}>()
);

export const SELECT_PROJECT_SUCCESS = createAction(
  '[Task API] Select Project Success',
  props<{project: Project}>()
);