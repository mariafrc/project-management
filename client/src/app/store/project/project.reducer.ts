import { Action, createReducer, on } from '@ngrx/store';
import * as ProjectActions from './project.actions';
import {Project} from './project.model';

export const projectFeatureKey = 'project';

export interface State {
	list: Project[]
}

export const initialState: State = {
	list: []
};


export const reducer = createReducer(
  initialState,

  on(ProjectActions.LOAD_PROJECT_SUCCESS, (state, action) => ({...state, list: action.projects}) ),

  on(ProjectActions.ADD_PROJECT_SUCCESS, (state, action) => ({
    ...state,
    list: state.list.concat(action.project)
  })),
  
  on(ProjectActions.DELETE_PROJECT_SUCCESS, (state, action) => ({
  	...state,
  	list: state.list.filter(p => p.id !== action.id)
  })),

);

