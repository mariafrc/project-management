import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromAuth from './auth.reducer';

export const selectAuthState = createFeatureSelector<fromAuth.State>(
  fromAuth.authFeatureKey
);

export const selectLoginError = createSelector(
	selectAuthState,
	(state) => state.errors.login
)

export const selectRegisterError = createSelector(
	selectAuthState,
	(state) => state.errors.register
)

export const selectAuthStatus = createSelector(
	selectAuthState,
	(state) => state.user.isAuth
)