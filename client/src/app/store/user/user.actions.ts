import { createAction, props } from '@ngrx/store';

export const LOGIN_PAGE_AUTHENTICATE = createAction(
  '[Login Page] Authenticate',
  props<{username: string, password: string}>()
);

export const AUTH_SUCCESS = createAction(
  '[Auth API] Auth Success',
  props<{username: string, role: string}>()
);

export const AUTH_FAIL = createAction(
  '[Auth API] Auth Fail',
  props<{error: string}>()
);

export const REGISTER_PAGE_REGISTER = createAction(
	'[Register Page] Register',
  props<{username: string, password: string}>()
);

export const REGISTER_SUCCESS = createAction(
  '[Auth API] Register Success',
  props<{username: string, role: string}>()
);

export const REGISTER_FAIL = createAction(
  '[Auth API] Register Fail',
  props<{error: string}>()
);

export const LOGIN_PAGE_CLEAR_ERROR = createAction(
  '[Login Page] Clear Error'
);

export const REGISTER_PAGE_CLEAR_ERROR = createAction(
  '[Register Page] Clear Error'
);

export const APP_LOAD_USER = createAction(
	'[App Component] Load User'
);

export const LOAD_USER_SUCCESS = createAction(
	'[Auth Service] Load User Success',
	props<{username: string, role: string, isAuth: boolean}>()
);

export const USER_MENU_LOGOUT = createAction(
  '[User Menu] Logout'
);

//if there is no user role
export const REDIRECT_LOGOUT = createAction(
  '[Redirect Page] Logout'
);

//for token expiration
export const AUTH_GUARD_LOGOUT = createAction(
  '[Auth Guard Page] Logout'
);

export const LOGOUT_SUCCESS = createAction(
  '[User Effects] Logout Success'
);