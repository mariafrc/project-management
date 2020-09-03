import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromProject from './project.reducer';

export const selectProjectState = createFeatureSelector<fromProject.State>(
  fromProject.projectFeatureKey
);

export const selectProjects = createSelector(
  selectProjectState,
  (state) => state.list
);

export const selectProject = createSelector(
	selectProjectState,
	(state) => state.selected
)