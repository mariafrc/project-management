import { Action, createReducer, on } from '@ngrx/store';
import * as AuthActions from './auth.actions';

export const authFeatureKey = 'auth';

export interface State {
	user: {
		sub: number,
		username: string,
		isAuth: boolean
	};
	errors: {
		login: string;
		register: string;
	}
}

export const initialState: State = {
	user: {
		sub: 0,
		username: '',
		isAuth: false
	},
	errors: {
		login: '',
		register: ''
	}
};


export const reducer = createReducer(
  initialState,

  on(AuthActions.AUTHENTICATION_SUCCESS, (state, action) => ({
  	...state,
  	user: {
  		sub: action.data.id,
  		username: action.data.username,
  		isAuth: true
  	}
  })),

  on(AuthActions.AUTHENTICATION_FAIL, (state, action) => ({
  	...state,
  	errors: {
  		login: action.error,
			register: ''
  	}
  })),

  on(AuthActions.REGISTER_FAIL, (state, action) => ({
  	...state,
  	errors: {
  		login: '',
			register: action.error
  	}
  })),

  on(
  	AuthActions.REGISTER_PAGE_RESET_ERROR,
  	AuthActions.LOGIN_PAGE_RESET_ERROR,
    AuthActions.LOGIN_PAGE_AUTHENTICATE,
    AuthActions.REGISTER_PAGE_REGISTER,
  	(state) => ({
  	...state,
  	errors: {
  		login: '',
			register: ''
  	}
  })),

  on(
    AuthActions.LOAD_USER_SUCCESS,
    (state, action) => ({
      ...state,
      user: {
        sub: action.user.sub,
        username: action.user.username,
        isAuth: true
      },
    })
  )
);

