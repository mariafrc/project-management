import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromTask from './task.reducer';

export const selectTaskState = createFeatureSelector<fromTask.State>(
  fromTask.taskFeatureKey
);
