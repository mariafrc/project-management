import { createAction, props } from '@ngrx/store';
import {Credentials} from './auth.model';
import {UserData} from '~services/user/user.service';

export const LOGIN_PAGE_AUTHENTICATE = createAction(
  '[Login Page] Authenticate',
  props<{credentials: Credentials}>()
);

export const AUTHENTICATION_SUCCESS = createAction(
  '[Auth API] Auth Success',
  props<{ data: any }>()
);

export const AUTHENTICATION_FAIL = createAction(
   '[Auth API] Auth Fail',
  props<{ error: any }>()
);

export const REGISTER_PAGE_REGISTER = createAction(
  '[Register Page] Register',
   props<{credentials: Credentials}>()
);

export const REGISTER_SUCCESS = createAction(
  '[Auth API] Register Success'
);

export const REGISTER_FAIL = createAction(
   '[Auth API] Register Fail',
  props<{ error: any }>()
);

export const LOGIN_PAGE_RESET_ERROR = createAction(
  '[Login Page] Reset Error'
);

export const REGISTER_PAGE_RESET_ERROR = createAction(
  '[Register Page] Reset Error'
);

export const APP_COMPONENT_LOAD_USER = createAction(
  '[App Component] Load User'
)

export const LOAD_USER_SUCCESS = createAction(
  '[Auth Effect] Load User Success',
  props<{user: UserData}>()
)

export const LOAD_USER_FAIL = createAction(
  '[Auth Effect] Load User Fail'
)