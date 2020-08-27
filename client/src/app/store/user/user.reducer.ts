import { createReducer, on } from '@ngrx/store';
import * as UserActions from './user.actions';

export const userFeatureKey = 'user';

export interface State {
	username: string
	role: string
	isAuth: boolean
  error: string
}

export const initialState: State = {
	username: null,
	role: null,
	isAuth: false,
  error: ''
};

export const reducer = createReducer(
  initialState,
  on(
    UserActions.AUTH_SUCCESS,
    UserActions.REGISTER_SUCCESS,
    (state, action) => ({
    	username: action.username, 
    	role: action.role,
    	isAuth: true,
      error: ''
    })
  ),

  on(
    UserActions.AUTH_FAIL,
    UserActions.REGISTER_FAIL,
    (state, action) => ({...state, error: action.error})
  ),

  on(
    UserActions.LOGIN_PAGE_CLEAR_ERROR,
    UserActions.REGISTER_PAGE_CLEAR_ERROR,
    (state) => ({...state, error: ''})
  ),

  on(UserActions.LOAD_USER_SUCCESS, (state, action) => ({
    ...state,
    username: action.username, 
    role: action.role,
    isAuth: action.isAuth
  })),

  on(UserActions.LOGOUT_SUCCESS, () => initialState)

);

