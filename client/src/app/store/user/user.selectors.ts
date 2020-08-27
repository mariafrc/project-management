import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromUser from './user.reducer';

export const selectUserState = createFeatureSelector<fromUser.State>(
  fromUser.userFeatureKey
);

export const selectAuthStatus = createSelector(
	selectUserState,
	(state) => state.isAuth
);

export const selectUserRole = createSelector(
	selectUserState,
	(state) => state.role
);

export const selectError = createSelector(
	selectUserState,
	(state) => state.error
);
