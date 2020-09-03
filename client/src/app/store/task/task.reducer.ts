import { Action, createReducer, on } from '@ngrx/store';
import * as TaskActions from './task.actions';
import {Task} from './task.model';

export const taskFeatureKey = 'task';


export interface State {
	list: Task[]
}

export const initialState: State = {
	list: []
};


export const reducer = createReducer(
  initialState,

  on(TaskActions.LOAD_TASK_SUCCESS, (state, action) => ({...state, list: action.tasks})),
  
  on(TaskActions.ADD_TASK_SUCCESS, (state, action) => ({
  	...state, 
  	list: state.list.concat(action.task)
  })),
  
  on(TaskActions.DELETE_TASK_SUCCESS, (state, action) => ({
  	...state, 
  	list: state.list.filter(t => t.id !== action.id)
  })),

);

