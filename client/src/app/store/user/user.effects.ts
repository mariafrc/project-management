import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, exhaustMap, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import {HttpClient} from '@angular/common/http';

import * as UserActions from './user.actions';
import {UserService} from '../../providers/services/user/user.service';
import {Router} from '@angular/router';

@Injectable()
export class UserEffects {

  authenticateUser$ = createEffect(() => {
    return this.actions$.pipe( 

      ofType(
        UserActions.LOGIN_PAGE_AUTHENTICATE
      ),
      exhaustMap(({username, password}) =>
        this.http.post<AuthResponse>(`/login`, {username, password})
        .pipe(
          map((data) => {
            localStorage.setItem('token', data.token);
            this.router.navigate(['/redirect']);
            return UserActions.AUTH_SUCCESS({username: data.username, role: data.role});
          }),
          catchError(() => of(UserActions.AUTH_FAIL({error: "Utilisateur ou mots de passe incorrect"})) )
        )
      )
    );
  });

  registerUser$ = createEffect(() => {
    return this.actions$.pipe( 

      ofType(
        UserActions.REGISTER_PAGE_REGISTER
      ),
      exhaustMap(({username, password}) =>
        this.http.post<AuthResponse>(`/register`, {username, password})
        .pipe(
          map((data) => {
            localStorage.setItem('token', data.token);
            this.router.navigate(['/redirect']);
            return UserActions.REGISTER_SUCCESS({username: data.username, role: data.role});
          }),
          catchError( (response) => {
            const message = response.error.type === 'user exist' 
              ? "Cet utilisateur existe déja" 
              : "Une erreur s'est produite";
            return of(UserActions.REGISTER_FAIL({error: message}));
          } )
        )
      )
    );
  });

  loadUser$ = createEffect(() => {
    return this.actions$.pipe( 

      ofType(
        UserActions.APP_LOAD_USER
      ),
      mergeMap(() =>
        this.userService.loadUser()
        .pipe(
          map((data) => UserActions.LOAD_USER_SUCCESS({
            username: data.username, 
            role: data.role, 
            isAuth: data.isAuth
          }) )
        )
      )
    );
  });

  logout$ = createEffect(() => {
    return this.actions$.pipe( 

      ofType(
        UserActions.USER_MENU_LOGOUT,
        UserActions.REDIRECT_LOGOUT,
        UserActions.AUTH_GUARD_LOGOUT
      ),
      exhaustMap(() =>
        this.userService.loadUser().pipe(
          map(() => {
            localStorage.removeItem('token');
            this.router.navigate(['/login']);
            return UserActions.LOGOUT_SUCCESS();
          } )
        )
      )
    );
  });

  constructor(
    private actions$: Actions,
    private userService: UserService,
    private router: Router,
    private http: HttpClient
  ) {}

}

interface AuthResponse{
  username: string
  role: string
  token: string
}