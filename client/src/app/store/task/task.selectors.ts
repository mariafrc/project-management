import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromTask from './task.reducer';

export const selectTaskState = createFeatureSelector<fromTask.State>(
  fromTask.taskFeatureKey
);

export const selectTasks = createSelector(
	selectTaskState,
	(state) => state.list
)